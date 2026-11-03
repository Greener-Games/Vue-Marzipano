/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

// marzipano ships without type definitions. It is typed once, in ./marzipano.ts.
declare module 'marzipano';
