import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import { type CreateChatCompletionResponse } from "openai";
import { useCallback, useState } from "react";
import { SSE } from "sse.js";
import { Infosection } from "~/components/infosection";
import { Submitform } from "~/components/submitform";
import { Divider } from "~/components/ui/divider";

export default function Index() {
  const [answer, setAnswer] = useState("");

  const handlePromptSubmit = useCallback((prompt: string) => {
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

        const completionResponse: CreateChatCompletionResponse = JSON.parse(
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
              <button
                title="copyanswer"
                onClick={() => console.log("copy to clipboard")}
              >
                <ClipboardDocumentIcon
                  className="mt-1 h-8 w-8 flex-none text-primary-600 hover:text-primary-500"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
