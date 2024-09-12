import { defineConfig } from 'vitest/config'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Allows you to use `expect` without explicitly importing
        environment: 'jsdom',
        alias: {
            '@': resolve(__dirname, 'app'),
        },
    },
})