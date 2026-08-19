/// <reference types="vite/client" />
declare module 'virtual:pwa-register' {
    export function registerSW(options: {
        onNeedRefresh?: () => void;
        onOfflineReady?: () => void;
        onRegistered?: (registration: ServiceWorkerRegistration) => void;
        onRegisterError?: (error: Error) => void;
    }): () => Promise<void>;
}