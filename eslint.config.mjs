// @ts-check
import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(eslint.configs.recommended, tseslint.configs.strict, tseslint.configs.stylistic, {
  ignores: ['MMM-NINA.js', 'node_helper.js']
})
