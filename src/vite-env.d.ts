/// <reference types="vite/client" />

declare module "*.JPG" {
    const value: string;
    export default value;
}


interface ImportMetaEnv {
    readonly VITE_FORMSPREE_ENDPOINT?: string;
}
