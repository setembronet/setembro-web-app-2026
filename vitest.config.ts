import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./tests/setupTests.ts'],
        include: ['**/*.test.ts', '**/*.test.tsx'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
