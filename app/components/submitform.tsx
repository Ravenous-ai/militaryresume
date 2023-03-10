import { useState } from "react";

export function Submitform({
  handlePromptSubmit,
}: {
  handlePromptSubmit: (prompt: string) => void;
}) {
  const [prompt, setPrompt] = useState("");
  return (
    <div className="relative pt-32">
      <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-primary-600">
        <label htmlFor="prompt" className="sr-only">
          Add your information
        </label>
        <textarea
          rows={5}
          name="prompt"
          id="prompt"
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
          placeholder="Add your information..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div className="py-2" aria-hidden="true">
          {/* Matches height of button in toolbar (1px border + 36px content height) */}
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
        <div className="flex-0 ">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handlePromptSubmit(prompt)}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
