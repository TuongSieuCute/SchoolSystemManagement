import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        settings: {
            react: {
                version: 'detect',
            }
        },

    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        rules: {
            indent: ['warn', 4],
            quotes: ['warn', 'single'],
            semi: ['warn', 'always'],
            'react/prop-types': 'off'
        }
    },
    {
        files: ['**/*.{test,spec}.{js,mjs,cjs,jsx}'],
        languageOptions: {
            globals: {
                expect: 'readonly',
            }
        }
    },
];