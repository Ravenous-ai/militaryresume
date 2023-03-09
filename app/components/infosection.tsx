import { CheckCircleIcon } from "@heroicons/react/20/solid";

export function Infosection() {
  return (
    <div className="text-base leading-7 text-gray-700">
      <p className="text-base font-semibold leading-7 text-primary-600">
        Introducing
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Narrative Builder
      </h1>
      <p className="mt-6 text-xl leading-8">
        An AI assistant that helps you write Air Force narrative style bullets.
      </p>
      <div className="mt-10">
        <p>
          This narrative bullet tool uses the Chat GPT model from OpenAI. It
          will turn a block of descriptive text into a narrative statement.
        </p>
        <ul className="mt-8 space-y-8 text-gray-600">
          {/* <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-primary-600"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-gray-900">
                Get an OpenAPI Key.
              </strong>{" "}
              Follow the instructions here to generate an API key. In order for
              this tool to be free, you must create an OpenAPI account and use
              your key to generate the bullets.
            </span>
          </li> */}
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-primary-600"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-gray-900">
                Add Specific Information.
              </strong>{" "}
              The more details you can provide the better. It also helps if you
              can provide specifics. Checkout the examples page.
            </span>
          </li>
          <li className="flex gap-x-3">
            <CheckCircleIcon
              className="mt-1 h-5 w-5 flex-none text-primary-600"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-gray-900">
                Prompt engineering
              </strong>{" "}
              The AI model is not perfect. Sometimes it will generate responses
              that aren't very good so to make them better we have followed some
              best practices to help make the results better. If you are
              interested in learning more check out this awesome article.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
