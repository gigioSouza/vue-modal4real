import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'vue-modal4real',
      fileName: (format) => `vue-modal4real.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        plugins: [
          typescript({
            check: true,
            tsconfig: resolve(__dirname, 'tsconfig.json'),
            tsconfigOverride: {
              compilerOptions: {
                sourceMap: true,
                declaration: true,
                declarationMap: true,
              },
              include: [
                "lib/**/*.ts",
                "lib/**/*.vue",
                "lib/**/*.d.ts",
                "lib/**/*.tsx"
              ],
              exclude: ['node_modules', 'dist', 'tests', 'cypress'],
            },
          })
        ]
      }
    }
  }
})
