import type { LoaderArgs } from "@remix-run/node";
import type { CreateCompletionRequest } from "openai";

export async function loader({ request }: LoaderArgs) {
  const openAiKey = process.env.OPENAI_API_KEY;

  const completionOptions: CreateCompletionRequest = {
    model: "text-davinci-003",
    prompt: "write a 100 word poem on why programmers are the best",
    max_tokens: 512,
    temperature: 0.9,
    stream: true,
  };
  const response = await fetch("https://api.openai.com/v1/completions", {
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
