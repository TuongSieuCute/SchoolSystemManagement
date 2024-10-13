import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';
export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            browser: {
                enabled: true,
                name: 'chromium',
                provider: 'playwright',
            },
            globals: true,
        },
        optimizeDeps: {
            force: true,
            esbuildOptions: {
                loader: {
                    '.js': 'jsx',
                },
            },
        },
    })
);
