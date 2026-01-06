import globals from 'globals';
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
    {
        ignores: [
            'playwright-report/**',
            'test-results/**',
            'dist/**',
            'coverage/**',
        ],
    },

    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.node },
    },

    {
        files: ['**/*.test.{js,mjs,cjs}', '**/*.spec.{js,mjs,cjs}'],
        ignores: ['tests/**', 'e2e/**', 'playwright/**'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    {
        files: [
            'tests/**/*.{js,mjs,cjs}',
            'e2e/**/*.{js,mjs,cjs}',
            '**/*.pw.{js,mjs,cjs}',
        ],
        extends: [playwright.configs['flat/recommended']],
        rules: {
            'playwright/expect-expect': 'off',
        },
    },
]);
