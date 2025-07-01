/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 其他 VITE_ 開頭的變數可以一起寫在這裡
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
