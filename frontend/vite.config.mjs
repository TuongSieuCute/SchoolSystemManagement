/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig, transformWithEsbuild } from 'vite';
export default defineConfig({
    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    build: {
        sourcemap: true
    },
    server: {
        port: 3000,
        strictPort: true,

    },
    plugins: [
        {
            name: 'treat-js-files-as-jsx',
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;

                // Use the exposed transform from vite, instead of directly
                // transforming with esbuild
                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
        react(),
    ],
});
