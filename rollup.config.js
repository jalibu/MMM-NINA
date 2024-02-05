import banner2 from 'rollup-plugin-banner2'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

import pkg from './package.json' assert { type: 'json' }

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
export default [
  {
    input: './src/frontend/Frontend.ts',
    external: ['logger'],
    plugins: [typescript({ module: 'ESNext' }), nodeResolve(), commonjs(), terser(), banner2(() => bannerText)],
    output: {
      file: './' + pkg.main,
      format: 'iife',
      globals: {
        logger: 'Log'
      }
    }
  },
  {
    input: './src/backend/Backend.ts',
    external: ['node_helper', 'logger'],
    plugins: [json(), typescript({ module: 'ESNext' }), nodeResolve(), terser(), banner2(() => bannerText)],
    output: {
      file: './node_helper.js',
      format: 'cjs'
    }
  }
]
