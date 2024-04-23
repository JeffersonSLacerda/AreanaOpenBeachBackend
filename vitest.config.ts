import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfiPaths from 'vite-tsconfig-paths'

export default defineConfig({
  define: {
    VITE_CJS_IGNORE_WARNING: true,
  },
  test: {
    globals: true,
    root: './',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      './src/config/**',
      '**/data/**',
    ],
  },
  plugins: [
    tsConfiPaths(),
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
})
