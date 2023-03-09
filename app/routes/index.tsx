import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import {
  type ChatCompletionResponseMessage,
  type CreateChatCompletionResponseChoicesInner,
  type CreateChatCompletionResponse,
} from "openai";
import { useCallback, useState } from "react";
import { SSE } from "sse.js";
import { Infosection } from "~/components/infosection";
import { Submitform } from "~/components/submitform";
import { Divider } from "~/components/ui/divider";
import toast from "react-hot-toast";

interface CreateChatCompletionResponseChoicesInnerMod
  extends CreateChatCompletionResponseChoicesInner {
  delta: ChatCompletionResponseMessage;
}

type CreateChatCompletionResponseMod = CreateChatCompletionResponse & {
  choices: CreateChatCompletionResponseChoicesInnerMod[];
};

export default function Index() {
  const [answer, setAnswer] = useState("");

  const handleCopyAnswerToClipboard = useCallback(() => {
    if (answer === "") {
      return;
    }

    navigator.clipboard.writeText(answer);
    toast("Copied to clipboard");
  }, [answer]);

  const handlePromptSubmit = useCallback((prompt: string) => {
    setAnswer("");
    const eventSource = new SSE("/openai/sse", {
      headers: {
        "content-type": "application/json",
      },
      payload: JSON.stringify({ prompt }),
    });

    eventSource.onerror = (error) => {
      console.log("error", error);
    };
    eventSource.onmessage = (event) => {
      try {
        if (event.data === "[DONE]") {
          eventSource.close();
          return;
        }

        const completionResponse: CreateChatCompletionResponseMod = JSON.parse(
          event.data
        );

        const [{ delta }] = completionResponse.choices;

        if (delta.content === undefined) {
          return;
        }

        setAnswer((answer) => {
          return (answer ?? "") + delta.content;
        });
      } catch (e) {
        console.log("error", e);
      }
    };

    eventSource.stream();

    return () => {
      eventSource.removeEventListener("error", () => {
        console.log("error");
      });
      eventSource.removeEventListener("message", () => {
        console.log("event closed");
      });
      eventSource.close();
    };
  }, []);

  return (
    <>
      <main>
        <div className="mx-auto max-w-3xl bg-white py-24 px-6 lg:px-8">
          <Infosection />
          <Submitform handlePromptSubmit={handlePromptSubmit} />
          <Divider title="RESULTS" />
          <div className="grid grid-cols-12 px-4 py-5 sm:px-6">
            <div className="col-span-11 ">{answer}</div>
            <div className="col-span-1 justify-self-end">
              {answer !== "" && (
                <button
                  title="copyanswer"
                  onClick={handleCopyAnswerToClipboard}
                >
                  <ClipboardDocumentIcon
                    className="mt-1 h-8 w-8 flex-none text-primary-600 hover:text-primary-500"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
