import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        svelte(),
        VitePWA({
            // Configuration object
            registerType: 'autoUpdate',
            manifest: {
                name:               'Sun Shadow Compass',
                short_name:         'Sun Compass',
                description:        'Real-Time Solar Shadow Direction Calculator',
                theme_color:        '#ffffff',
                background_color:   '#ffffff',
                display:            'standalone',
                start_url:          '/',
                icons: [
                    {
                        src:        '/icon-192.png',
                        sizes:      '192x192',
                        type:       'image/png'
                    },
                    {
                        src:        '/icon-512.png',
                        sizes:      '512x512',
                        type:      'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
            }
        })
    ],
    build: {outDir: 'dist'},
    base: '/'
})