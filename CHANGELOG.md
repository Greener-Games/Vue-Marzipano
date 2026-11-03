# 1.0.0 (2026-11-03)

### Bug Fixes

- give each MarzipanoViewer its own state so several can share a page ([59a9c32](https://github.com/Greener-Games/Vue-Marzipano/commit/59a9c32d93ac4daa2b0d5db3012549af92c2027c))
- image paths, title bar escaping and demo hotspot data ([61d11f2](https://github.com/Greener-Games/Vue-Marzipano/commit/61d11f2ca1cdfda957a2da473dc10ba8e2b78132))
- keep a tile url's query string and pass extra button fields through ([8145da0](https://github.com/Greener-Games/Vue-Marzipano/commit/8145da04e88c875d3f698ca8c1f735155bf5b5dd))

### Features

- add custom hotspot example ([6bd0edb](https://github.com/Greener-Games/Vue-Marzipano/commit/6bd0edbe26b9ad50b6e4c8eb92d52f07fb69ee72))
- settle the plugin api for 1.0 ([bdc0a86](https://github.com/Greener-Games/Vue-Marzipano/commit/bdc0a86e3280c6c07f6b105ef9925654db560b2e))

### BREAKING CHANGES

- `cloud` is replaced by `tiles`, the `env` option and
  `findEnvVariableByKey` are gone, `useMarzipanoContext()` and the string
  inject keys are removed, `GetImage` is renamed `resolveImageUrl`,
  `createMarzipano`, `Hotspot`, `VueMarzipanoButton`, `generateGUID` and
  `updateHotspots` are no longer exported, the built-in buttons are no longer
  global components, and the unused `fullscreenButton` and
  `viewControlButtons` settings are removed. See the plugin README's
  "Migrating from 0.x".

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
