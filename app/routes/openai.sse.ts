import type { LoaderArgs } from "@remix-run/node";
import {
  type CreateChatCompletionRequest,
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";

export async function action({ request }: LoaderArgs) {
  const openAiKey = process.env.OPENAI_API_KEY;
  const requestData = await request.json();
  const sanitizedPrompt = requestData.prompt.trim();

  const configuration = new Configuration({ apiKey: openAiKey });
  const openai = new OpenAIApi(configuration);

  // Moderate the content to comply with OpenAI T&C
  const moderationResponse = await openai.createModeration({
    input: sanitizedPrompt,
  });

  const [results] = moderationResponse.data.results;

  if (results.flagged) {
    throw new Error("Your input has flagged content" + results.categories);
  }

  const prompt = `
  Write a narrative statement using the information provided:

  innformation: """
  ${sanitizedPrompt}
  """

  Do not include any additional text besides the statement
  `;

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        'You are an enlisted member in the united states Air Force an expert in writing narrative style performance statements. A narrative style statement is a stand alone sentence and includes an action, impact and a result or outcome. The statement should be written in the past tense and consist of plain language words avoiding acronyms and abbreviations. Personal pronouns (I, me, my, we, us, our, etc.) should not be used. It should include transition words like "by" and "which".',
    },
    {
      role: "assistant",
      content:
        "Example narrative statement: Capt Snuffy led a survey team of 33 MCA to establish an XAB in support of a PACAF ACE exercise across 4 countries and including 7 allies, culminating in 153 sorties and 334 training events completed. She also championed a critical organizational merger of the squadron’s maintenance and operations; results saved 360 maintenance workhours per week and increased sortie generation by 10%.",
    },
    {
      role: "assistant",
      content:
        "Example narrative Statement: TSgt Snuffy led 4 instructors through Mission Ready Airmen course validation, generating 153 changes, eliminating 32 classroom hours, and enhancing course experience for 6 instructors and 70 students per year. Additionally, he facilitated a $15M facility renovation project, ensuring the CY22 schedule started on-time for 8 different courses spanning 11 AFSCs. ",
    },
    { role: "user", content: prompt },
  ];

  const completionOptions: CreateChatCompletionRequest = {
    model: "gpt-3.5-turbo",
    messages,
    max_tokens: 512,
    temperature: 0.9,
    stream: true,
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      Authorization: `Bearer ${openAiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(completionOptions),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error("Open API returned an error " + error);
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
