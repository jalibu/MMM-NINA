# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.0.5](https://github.com/jalibu/MMM-NINA/compare/v2.0.4...v2.0.5) (2026-09-18)

### Performance Improvements

* use Map for O(1) city name lookup ([1d95ac6](https://github.com/jalibu/MMM-NINA/commit/1d95ac6cb9674397d7d6a37922ec4d82b67287d3))

### Documentation

* restructure config section to match other modules' README style ([e9f358f](https://github.com/jalibu/MMM-NINA/commit/e9f358f1103718716c10da1ccba62a94852c7326))

### Chores

* modernize ESLint configuration ([3627810](https://github.com/jalibu/MMM-NINA/commit/3627810ec9f03c3a078ffb3bbedc2ac0e7224a31))
* update devDependencies ([cb5aa64](https://github.com/jalibu/MMM-NINA/commit/cb5aa646da33ab710c72907675407f8d3701c1a0))
* update Node.js setup action ([5c66054](https://github.com/jalibu/MMM-NINA/commit/5c66054811994139a1ea1b65197a36c53fef8bca))

### Code Refactoring

* remove deprecated mergeAlerts option ([585c7ef](https://github.com/jalibu/MMM-NINA/commit/585c7ef57144ed4560b741394551575cb9a682f7))
* use Promise.allSettled for parallel API requests ([2f4bd97](https://github.com/jalibu/MMM-NINA/commit/2f4bd97ac5f1a4c8a4ff1bb998399617603ff167))

### Tests

* cover alert processing edge cases ([a31ee3f](https://github.com/jalibu/MMM-NINA/commit/a31ee3fd9587f46910d1dc3057dbac3a00218e02))
* cover NINA dashboard API requests ([5e3a355](https://github.com/jalibu/MMM-NINA/commit/5e3a355f0bf0972494e76b7c929e44b77aaf96b0))
* make alert processing tests deterministic ([aa631f6](https://github.com/jalibu/MMM-NINA/commit/aa631f6584f51b2640808b5124e7835513ca3f6a))

## [2.0.4](https://github.com/jalibu/MMM-NINA/compare/v2.0.3...v2.0.4) (2026-07-05)


### Chores

* update checkout action ([a407f89](https://github.com/jalibu/MMM-NINA/commit/a407f89ed68f88d698db3ebff88c3e3e17c9108c))
* update devDependencies ([b5d77d3](https://github.com/jalibu/MMM-NINA/commit/b5d77d3681231a3ea6f747379fa0db8396e545c4))


### Code Refactoring

* replace moment with locale-aware Intl.DateTimeFormat for alert dates ([607763a](https://github.com/jalibu/MMM-NINA/commit/607763a3c6854afa372ccbe1ccac7d927abadf99))
* simplify rollup config ([270ecdc](https://github.com/jalibu/MMM-NINA/commit/270ecdc7acf9432e950c5f63f3a5997bca746c0e))


### Build System

* switch to ESNext bundler settings ([00d3a3e](https://github.com/jalibu/MMM-NINA/commit/00d3a3e6053b1c6613534deac1d78e96b606ebc0))

## [2.0.3](https://github.com/jalibu/MMM-NINA/compare/v2.0.2...v2.0.3) (2026-06-12)


### Fixed

* update import statement for NodeHelper to default import ([a23737a](https://github.com/jalibu/MMM-NINA/commit/a23737a46f77db678caf39b6f7143d9773df53d4))
* update NINA icon URLs to current warnung.bund.de API endpoint ([#48](https://github.com/jalibu/MMM-NINA/issues/48)) ([96bcfa0](https://github.com/jalibu/MMM-NINA/commit/96bcfa0cacdcd049bdcf1d5a097daefc3baa7833))
* validate HTTP status for NINA API requests ([555131c](https://github.com/jalibu/MMM-NINA/commit/555131c3623c71b432dca8ccf8bce589e7591155))


### Chores

* add missing devDependency ([60aca8a](https://github.com/jalibu/MMM-NINA/commit/60aca8ab688b286aa33d0879be19889aa31b7cc8))
* update devDependencies ([1bb3d35](https://github.com/jalibu/MMM-NINA/commit/1bb3d3522f19b54313a0675ee96d652c48bfbdf5))


### Code Refactoring

* simplify removeDuplicates logic ([0d2fb6d](https://github.com/jalibu/MMM-NINA/commit/0d2fb6d3fbba579174cb95d8f76caad03c2e81c7))

## [2.0.2](https://github.com/jalibu/MMM-NINA/compare/v2.0.1...v2.0.2) (2026-04-15)


### Fixed

* add missing types declaration for magicmirror-module ([7afb536](https://github.com/jalibu/MMM-NINA/commit/7afb536b501c9ed6190485e4149da96cafeb8c9d))
* **test:** run unit tests from compiled TS output ([c1d36da](https://github.com/jalibu/MMM-NINA/commit/c1d36da239e0d96c96b86b6d72aa909efc8adf07))
* update NINA asset host for icons ([9ac90e6](https://github.com/jalibu/MMM-NINA/commit/9ac90e6620793e9a267f573b99bdbfe1ddb50d9b)), closes [#39](https://github.com/jalibu/MMM-NINA/issues/39)


### Chores

* add "type" field to package.json ([28c5e7a](https://github.com/jalibu/MMM-NINA/commit/28c5e7aecf8715f549e43d2aa0b36de3fa90d06e))
* add moduleResolution option to TypeScript plugin in rollup config ([79dcc8f](https://github.com/jalibu/MMM-NINA/commit/79dcc8f6d3341e6033f80b9ae56034c0356d93d8))
* update devDependencies ([839e4b9](https://github.com/jalibu/MMM-NINA/commit/839e4b94fb81dd9cc0fdcce5adb258cadbc50a52))

## [2.0.1](https://github.com/jalibu/MMM-NINA/compare/v2.0.0...v2.0.1) (2026-03-30)


### Fixed

* declare module exports for proper module handling ([bfb7bb9](https://github.com/jalibu/MMM-NINA/commit/bfb7bb9b047d9c903e8d08ad5943be0c32fa0cfd))

## [2.0.0](https://github.com/jalibu/MMM-NINA/compare/v1.9.1...v2.0.0) (2026-03-29)


### ⚠ BREAKING CHANGES

* enforce 12-digit AGS and update Regionalschluessel dataset to 2026-03-31

### Chores

* change variable declaration in demo config ([bfc9b1a](https://github.com/jalibu/MMM-NINA/commit/bfc9b1a0714907d97d3a297d8ed68d927d8ad012))
* update devDependencies ([f021d4f](https://github.com/jalibu/MMM-NINA/commit/f021d4f5914d6ce6d0124b275d5225842f7e8252))
* update prepare script ([4dcc5ed](https://github.com/jalibu/MMM-NINA/commit/4dcc5ed6b086bdbbee07206574081b52ecd03138))


### Code Refactoring

* enforce 12-digit AGS and update Regionalschluessel dataset to 2026-03-31 ([036b14d](https://github.com/jalibu/MMM-NINA/commit/036b14dc9f76bb586018335ce01c3a7a35537f02))
* extract AGS and alert processing into testable modules ([59aebf8](https://github.com/jalibu/MMM-NINA/commit/59aebf8ebcc73c0dc646e49c34a1c173a0648789))


### Continuous Integration

* add automated testing workflow for CI/CD ([13d3e45](https://github.com/jalibu/MMM-NINA/commit/13d3e45be4de557e7b62c19a0b0b523e7c3e5b9a))

## [1.9.1](https://github.com/jalibu/MMM-NINA/compare/v1.9.0...v1.9.1) (2026-02-16)


### Documentation

* add Code of Conduct ([ed87ab9](https://github.com/jalibu/MMM-NINA/commit/ed87ab9870fd3f6637a3da2e475c2c83f97d9a12))
* add trailing comma to config example ([28ad854](https://github.com/jalibu/MMM-NINA/commit/28ad8542c90dd77b08cdabe5e33b9453c1a20248))
* separate config section ([1e81d8d](https://github.com/jalibu/MMM-NINA/commit/1e81d8defaf7817514387e8b79a0c7ed40a27dd5))
* update CHANGELOG.md with release notes for versions 1.8.1 to 1.0.0 ([ca75bde](https://github.com/jalibu/MMM-NINA/commit/ca75bde7f3dffaf102c343796b30ddf2e1b29b73))


### Chores

* add changelog configuration and update release script ([a32164c](https://github.com/jalibu/MMM-NINA/commit/a32164cbc661fcaafd758ab985211fff56f4ac61))
* automate build on version bump for release ([21ddd66](https://github.com/jalibu/MMM-NINA/commit/21ddd66705a1667e4af1cc1723593b28c3ad06b2))
* remove old rollup configuration file ([aa9dc42](https://github.com/jalibu/MMM-NINA/commit/aa9dc42c68460d673f6d7efe06810d64484b48c9))
* update devDependencies ([0ddbd3e](https://github.com/jalibu/MMM-NINA/commit/0ddbd3ef0ad55c419c0824e06727f16fafc7b9c3))

## [1.9.0](https://github.com/jalibu/MMM-NINA/compare/v1.8.1...v1.9.0) (2025-12-17)


### Features

* add demo configuration and update scripts for module testing ([4d4d9e8](https://github.com/jalibu/MMM-NINA/commit/4d4d9e8a7de1bc80c6d8b44afca4161244a3c4b9))
* allow multi instances ([08bfa85](https://github.com/jalibu/MMM-NINA/commit/08bfa855ea567ca4cbc23a2f84c17bad8553b494))
* automate code quality with simple-git-hooks ([1c7c962](https://github.com/jalibu/MMM-NINA/commit/1c7c9623e3c70f2b23a35fc936167e46997e828e))
* automated releases with commit-and-tag-version ([1817beb](https://github.com/jalibu/MMM-NINA/commit/1817beb9ce9e843c2463a3b416b26e84520495fa))
* enforce function documentation with eslint-plugin-jsdoc ([5e26655](https://github.com/jalibu/MMM-NINA/commit/5e26655e5b3927667a6c0d33252a928c634cb5d0))

## [1.8.1](https://github.com/jalibu/MMM-NINA/releases/tag/v1.8.1) (2024-02-05)

### Changes

* Dependencies bereinigt/aktualisiert; Installation nach Git-Clone ohne weitere Downloads

## [1.8.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.8.0) (2024-01-19)

### Features

* Neues Feature `orderBySeverity`: Warnungen werden standardmäßig nach Schweregrad sortiert (deaktivierbar)

## [1.7.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.7.0) (2022-02-19)

### Features

* Neue Optionen `hideCancelledWarnings`, `mergeAlertsByTitle`
* Umbenennung `mergeAlerts` → `mergeAlertsById` (alias weiter akzeptiert)

## [1.6.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.6.0) (2022-01-10)

### Features

* Event-Icons werden angezeigt, wenn verfügbar

## [1.5.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.5.0) (2022-01-10)

### Features/Fixes

* Option `downgradeCancelSeverity`
* Fix: `downgradeLhpSeverity` zuverlässiger

## [1.4.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.4.0) (2022-01-09)

### Features

* Provider-Filteroptionen

## [1.3.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.3.0) (2021-10-13)

### Features

* Mehrere Städte abrufbar; alternatives TOP-Theme; Datum/Stadt ausblendbar

## [1.2.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.2.0) (2021-10-03)

### Internal

* Internes Refactoring, ModType v2

## [1.1.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.1.0) (2021-09-16)

### Features

* Neue Optionen `maxWidth`, `showIcon`

## [1.0.0](https://github.com/jalibu/MMM-NINA/releases/tag/v1.0.0) (2021-09-11)

### Initial release

* Erstveröffentlichung; Severity “Severe” rot; Buildprozess harmonisiert
