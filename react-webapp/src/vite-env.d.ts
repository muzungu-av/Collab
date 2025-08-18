/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_ADMIN_CONTACT_EMAIL: string;
  // другие переменные
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
