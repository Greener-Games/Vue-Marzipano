# Vue Marzipano

Source for [`@greener-games/vue-marzipano`](plugins/@greener-games/vue-marzipano/README.md), a Vue 3 wrapper for the [Marzipano](https://www.marzipano.net/) 360° panorama viewer, plus a demo site with docs and examples that runs against the plugin's source.

Created with cd-web-new-project v0.1.0 from Vue_Template_Project@4cdae41 on 2026-11-03.

## Layout

This is an npm workspace, set up from the team's Vue template as a plugin project.

- `plugins/@greener-games/vue-marzipano/`: the published package. See its [README](plugins/@greener-games/vue-marzipano/README.md) for how to use it.
  - `src/Views/MarzipanoViewer.vue`: the viewer component.
  - `src/composables/useMarzipano.ts`: per-viewer state and controls.
  - `src/types.ts`: the scene data format and the Marzipano API types.
- `src/`: the demo site (Vue Router, Tailwind). It imports the plugin from source via a Vite alias, so plugin edits hot-reload.
  - `src/views/examples/`: basic viewer, multiple viewers, custom hotspots, slot overrides, custom viewpoints, and a custom layout that replaces all of the built-in UI (components in `src/components/tour/`).
  - `src/data/`: the demo tour data.
- `public/tiles/`: demo panorama tiles. `public/assets/img/`: demo control icons.

## Develop

Needs Node 20+ and npm 10+.

```sh
npm install
npm run dev
```

The dev server runs on a fixed port per project name: http://localhost:17688.

| Script                 | Does                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Demo site with hot reload                                         |
| `npm run build`        | Builds the plugin (`plugins/…/dist`), then the demo site (`dist`) |
| `npm run lint`         | ESLint, Stylelint, Prettier and vue-tsc                           |
| `npm run lint:fix`     | Auto-fixes what it can                                            |
| `npm run health-check` | Writes `health-report.md`; CI fails below grade C                 |

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`…). Husky runs lint-staged and commitlint on each commit.

## Release

Releases are automated by `.github/workflows/ci-cd.yml` and semantic-release. See [`.supporting_docs/RELEASE_PROCESS.md`](.supporting_docs/RELEASE_PROCESS.md).

- Pushes and pull requests to `develop` and `master` run the build and health check.
- A push to `master` that passes runs semantic-release. It works out the version from the commits, tags it, updates `CHANGELOG.md`, and publishes the plugin to npm.
- Publishing needs an `NPM_TOKEN` repository secret with publish rights to the `@greener-games` scope.
