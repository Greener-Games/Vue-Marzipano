# 1.0.0 (2026-11-03)

### Bug Fixes

- give each MarzipanoViewer its own state so several can share a page ([8c9e42e](https://github.com/Greener-Games/Vue-Marzipano/commit/8c9e42ec19494931f87194d01e40ba404f70681d))
- image paths, title bar escaping and demo hotspot data ([e20a694](https://github.com/Greener-Games/Vue-Marzipano/commit/e20a694018f95e14b9d056ed97607f65ca81d704))
- keep a tile url's query string and pass extra button fields through ([8a79334](https://github.com/Greener-Games/Vue-Marzipano/commit/8a79334b09cec13641a3c2b1624bd3809d45a7d1))

### Features

- add custom hotspot example ([3dd9955](https://github.com/Greener-Games/Vue-Marzipano/commit/3dd9955ab7ebb5b9f2f057645a791a70b192935d))
- settle the plugin api for 1.0 ([add143c](https://github.com/Greener-Games/Vue-Marzipano/commit/add143cca9d4545f68a19a5e6b22643ecda3a97c))

### BREAKING CHANGES

- `cloud` is replaced by `tiles`, the `env` option and
  `findEnvVariableByKey` are gone, `useMarzipanoContext()` and the string
  inject keys are removed, `GetImage` is renamed `resolveImageUrl`,
  `createMarzipano`, `Hotspot`, `VueMarzipanoButton`, `generateGUID` and
  `updateHotspots` are no longer exported, the built-in buttons are no longer
  global components, and the unused `fullscreenButton` and
  `viewControlButtons` settings are removed. See the plugin README's
  "Migrating from 0.x".
