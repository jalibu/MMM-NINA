import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

import pkg from './package.json' with { type: 'json' }

const bannerText = `/*! *****************************************************************************
  ${pkg.name}
  Version ${pkg.version}

  ${pkg.description}
  Please submit bugs at ${pkg.bugs.url}

  (c) ${pkg.author ? pkg.author : pkg.contributors}
  Licence: ${pkg.license}

  This file is auto-generated. Do not edit.
***************************************************************************** */

`

const typescriptPlugin = typescript({ module: 'ESNext', moduleResolution: 'bundler' })
const minifyPlugin = terser({
  format: {
    comments: false,
    preamble: bannerText.trim()
  }
})

const frontendPlugins = [typescriptPlugin, nodeResolve(), commonjs(), minifyPlugin]
const backendPlugins = [json(), typescriptPlugin, nodeResolve(), minifyPlugin]

export default [
  {
    input: './src/frontend/Frontend.ts',
    external: ['logger'],
    plugins: frontendPlugins,
    output: {
      banner: bannerText,
      file: `./${pkg.main}`,
      format: 'iife',
      globals: {
        logger: 'Log'
      }
    }
  },
  {
    input: './src/backend/Backend.ts',
    external: ['node_helper', 'logger'],
    plugins: backendPlugins,
    output: {
      banner: bannerText,
      file: './node_helper.js',
      format: 'cjs'
    }
  }
]
