import './styles/themes.css';
import './styles/globals.css';

import { registerSW } from 'virtual:pwa-register';
import {  mount  } from 'svelte';
import App from './App.svelte'

const target = document.getElementById('app');
if (!target) {
    throw new Error("Missing #app element in index.html");
}

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
            updateSW();
        }
    },
    onOfflineReady() {
        console.log('App ready to work offline');
    },
    onRegistered(registration) {
        console.log('Service Worker registered:', registration);
    },
    onRegisterError(error) {
        console.error('SW registration failed:', error);
    }
});


mount(App, { target });