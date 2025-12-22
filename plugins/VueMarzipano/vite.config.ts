import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from "vite-plugin-dts";

// Export the Vite configuration
export default defineConfig({
    plugins: [vue(), dts()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'), // Main entry point for the plugin
            name: '@greener-games/vue-marzipano', // Global variable name
            fileName: (format) => `vue-marzipano.${format}.js`, // Output file names
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
