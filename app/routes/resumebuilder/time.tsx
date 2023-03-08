import type { CreateCompletionResponse } from "openai";
import React from "react";
import { useEffect } from "react";
import { SSE } from "sse.js";

export default function Time() {
  const [answer, setAnswer] = React.useState("");

  useEffect(() => {
    const eventSource = new SSE("/openai/sse", {
      headers: {
        "content-type": "application/json",
      },
    });

    eventSource.onerror = (error) => {
      console.log("error", error);
    };
    eventSource.onmessage = (event) => {
      try {
        console.log("event", event);

        if (event.data === "[DONE]") {
          eventSource.close();
          return;
        }

        const completionResponse: CreateCompletionResponse = JSON.parse(
          event.data
        );

        const [{ text }] = completionResponse.choices;

        setAnswer((answer) => {
          return (answer ?? "") + text;
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

  return <p>{answer}</p>;
}
