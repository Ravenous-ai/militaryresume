/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare module "sse.js" {
  export type SSEOptions = EventSourceInit & {
    headers?: Record<string, string>;
    payload?: string;
    method?: string;
  };

  export class SSE extends EventSource {
    constructor(url: string | URL, sseOptions?: SSEOptions);
    stream(): void;
  }
}
