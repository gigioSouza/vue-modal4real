import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'vue-modal4real',
      fileName: (format) => `vue-modal4real.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      plugins: [
        typescript({
          check: false,
          tsconfig: resolve(__dirname, 'tsconfig.json'),
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
              declarationMap: true,
            }
          },
        })
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
