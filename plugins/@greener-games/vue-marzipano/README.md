# @greener-games/vue-marzipano

A Vue 3 wrapper for the [Marzipano](https://www.marzipano.net/) 360° panorama viewer. You describe your scenes, hotspots and controls in one data object, and `<MarzipanoViewer>` renders the tour: scene switching, link and info hotspots, auto-rotate, fullscreen, zoom and look controls, and a scene list.

## Install

```sh
npm install @greener-games/vue-marzipano
```

Vue 3 is a peer dependency. `marzipano` and `@vueuse/core` are installed with the package.

## Set up

Import the stylesheet once, in `main.ts`. Registering the plugin is optional; do it to set options:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import VueMarzipano from '@greener-games/vue-marzipano';
import '@greener-games/vue-marzipano/style.css';

const app = createApp(App);
app.use(VueMarzipano, { baseUrl: import.meta.env.BASE_URL });
app.mount('#app');
```

- **`baseUrl`**: where your app is served from. Relative tile and image paths resolve against it. You only need it when the app isn't served from the site root, e.g. on GitHub Pages under `/my-repo/`. Defaults to `/`.
- Any other option is passed to the Marzipano viewer constructor.

The plugin registers no global components, so it can't clash with yours.

## Use

```vue
<template>
  <div style="height: 100vh">
    <MarzipanoViewer :data="tour" />
  </div>
</template>

<script setup lang="ts">
  import { MarzipanoViewer } from '@greener-games/vue-marzipano';
  import type { MarzipanoData } from '@greener-games/vue-marzipano';
  import { tour } from './tour';
</script>
```

The viewer fills its container, so give the container a height.

## Scene data

```ts
import type { MarzipanoData } from '@greener-games/vue-marzipano';

export const tour: MarzipanoData = {
  name: 'My tour',
  scenes: [
    {
      id: '0-lobby', // tiles are loaded from /tiles/0-lobby/{z}/{f}/{y}/{x}.jpg
      name: 'Lobby',
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
      ],
      faceSize: 256,
      initialViewParameters: { yaw: 0, pitch: 0, fov: 1.4 },
      linkHotspots: [{ yaw: 2.3, pitch: 0, target: '1-garden' }],
      infoHotspots: [
        { yaw: 0, pitch: 0.1, title: 'Reception', text: 'Open 9 to 5', type: 'InfoHotspot' },
      ],
    },
    // ...
  ],
  settings: {
    mouseViewMode: 'drag',
    autorotateEnabled: true,
    navigationButtons: [
      { type: 'AutoRotateButton', imageOn: 'img/play.png', imageOff: 'img/pause.png' },
      { type: 'FullscreenButton', imageName: 'img/fullscreen.png' },
      { type: 'NavigateButton', zoomFactor: 0.8, imageName: 'img/plus.png' },
      { type: 'NavigateButton', xFactor: -10, imageName: 'img/left.png' },
    ],
  },
  icons: { defaultNavigationIcon: 'img/link.png' },
};
```

- **Tiles** are read from `tiles/<scene id>/` under your `baseUrl`, in the layout the [Marzipano tool](https://www.marzipano.net/tool/) exports. Put them in your app's `public/tiles/`.
- **Tiles hosted elsewhere** (Azure Storage, S3, a CDN): set `tiles: { url, query }`.
  - `url` is the folder that holds one folder per scene id, at any depth: `https://acct.blob.core.windows.net/tours/neom` loads `…/tours/neom/<scene id>/{z}/{f}/{y}/{x}.jpg`. A scene id can contain folders too (`building-a/0-lobby`).
  - `query` is added to every tile request, e.g. `query: import.meta.env.VITE_TILE_SAS`. You can also paste a SAS URL straight into `url`, and its query string is kept.
  - The token ends up in every visitor's browser, so use a read-only one that only covers the tiles.
  - The host must allow cross-origin `GET` requests from your site (CORS), because the viewer draws tiles with WebGL.
- **Image paths** (`imageName`, `imageOn`, `icons…`) resolve from your `baseUrl`, so `img/plus.png` means `public/img/plus.png`. Full URLs work too.
- **Optional fields:** `name`, `settings` and every setting in it, `tiles`, `icons`, and each scene's `linkHotspots` and `infoHotspots`. `mouseViewMode` defaults to `drag` and `autorotateEnabled` to false.
- **Navigation buttons:** `NavigateButton` takes `zoomFactor`, `xFactor` (degrees) or `yFactor` (degrees). Every button takes an optional `label` for its accessible name; a sensible one is derived when you leave it out.
- A link hotspot can set `imageOverride`, and a scene can set `navigationViewParameters` for the view used when you arrive through a hotspot.

The viewer doesn't modify the object you pass. To show a different tour, pass a new object; changes inside a reactive object also rebuild the viewer.

All of these types are exported: `MarzipanoData`, `SceneData`, `LinkHotspot`, `InfoHotspot`, `NavigationButton` and more.

## Custom hotspots and buttons

Link hotspots use the built-in `NavigationHotspot` unless you set a `type`. Info hotspots always need one. A hotspot's `type`, or a button's, is the name of a built-in component or one you registered globally. That component receives the hotspot as its `hotspot` prop, or the button as `buttonData`, including any extra fields you add. A type with no matching component isn't shown, and a warning is logged. Register yours in `main.ts`:

```ts
app.component('InfoHotspot', InfoHotspot);
```

```vue
<script setup lang="ts">
  import type { InfoHotspot } from '@greener-games/vue-marzipano';
  defineProps<{ hotspot: InfoHotspot }>();
</script>
```

Inside the viewer, a custom component gets the viewer's state and controls from `useMarzipano()`:

```ts
import { useMarzipano, resolveImageUrl } from '@greener-games/vue-marzipano';

const { currentScene, switchScene, findSceneById, lookTo } = useMarzipano();
```

It returns read-only refs `data`, `scenes`, `currentScene`, `viewer` (the Marzipano viewer) and `panoElement`. It also returns `enableAutoRotate`, a ref you can set, and the functions `switchScene`, `findSceneById`, `findSceneDataById`, `lookTo` and `setFov`. `resolveImageUrl()` resolves an image path the way the built-in components do. The built-in components (`NavigateButton`, `SceneList`…) are exported too, so you can reuse them in the slots.

## Slots

There are two ways to change the controls:

- **Swap single buttons.** Give an entry in `navigationButtons` the `type` of your own registered component. It receives the entry as its `buttonData` prop, extra fields included:

  ```ts
  app.component('ShareButton', ShareButton);
  // in the scene data
  navigationButtons: [{ type: 'ShareButton', label: 'Share', url: 'https://…' }];
  ```

- **Replace the UI completely.** `<MarzipanoViewer>` has three slots: `titleBar`, `contentButtons` (the control bar) and `scenes` (the scene list). Anything you put in a slot sits inside the viewer, so your components can call `useMarzipano()` to drive it:

  ```vue
  <MarzipanoViewer :data="tour">
    <template #titleBar><TourHeader /></template>
    <template #contentButtons><TourToolbar /></template>
    <template #scenes><TourSceneMenu /></template>
  </MarzipanoViewer>
  ```

  Slot content is laid over the panorama, so position it with `position: absolute`. The repo's [custom layout example](https://github.com/Greener-Games/Vue-Marzipano/tree/master/src/components/tour) builds a complete replacement UI this way: a header, a slide-out scene menu, a zoom/auto-rotate/fullscreen toolbar and previous/next scene buttons.

## Controlling a viewer from outside

Use a template ref:

```vue
<template>
  <MarzipanoViewer ref="viewer" :data="tour" />
  <button type="button" @click="viewer?.lookTo(0, 0)">Look ahead</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { MarzipanoViewer } from '@greener-games/vue-marzipano';
  const viewer = ref<InstanceType<typeof MarzipanoViewer> | null>(null);
</script>
```

The ref exposes the same state and controls as `useMarzipano()`.

Each `<MarzipanoViewer>` keeps its own state, so you can put several on one page.

## Migrating from 0.x

1.0.0 contains breaking changes:

- **`useMarzipano()` only works inside a `<MarzipanoViewer>`.** It used to return one shared, global viewer. From outside a viewer, use a template ref (above). Its state refs are now read-only, apart from `enableAutoRotate`.
- **`useMarzipanoContext()` and the string inject keys are gone** (`inject('viewer')`, `inject('data')`, `inject('marzipanoViewFunctions')`…). Use `useMarzipano()`: `viewFunctions.switchScene()` becomes `switchScene()`.
- **`cloud` is replaced by `tiles`.** `cloud: { enabled: true, url, key: 'VITE_X' }` becomes `tiles: { url, query: import.meta.env.VITE_X }`. The plugin's `env` option is gone.
- **Removed exports:** `createMarzipano`, `useMarzipanoContext`, `Hotspot`, `VueMarzipanoButton`, `findEnvVariableByKey`, `generateGUID` and `updateHotspots`. `GetImage` is now `resolveImageUrl`.
- **The built-in buttons aren't registered as global components any more.** `type: 'NavigateButton'` and the rest still work in the scene data. To use one in your own template, import it.
- **A hotspot or button whose `type` has no component** renders nothing and logs a warning. It used to fall back to a navigation arrow.
- **Removed the `fullscreenButton` and `viewControlButtons` settings.** They had no effect.
- **The viewer no longer writes ids into your data.** Hotspots without an `id` get `<scene id>-link-<n>` or `<scene id>-info-<n>` on the copy the viewer keeps.
- **CSS class names are kebab-case:** `titleBar` → `title-bar`, `sceneName` → `scene-name`, `sceneList` → `scene-list`, `sceneListToggle` → `scene-list-toggle`, `navigationButton` → `navigation-button`, `autorotateToggle` → `autorotate-toggle`. Update any overrides.
- **Image paths no longer get a `/src/` prefix on `localhost`.** Paths resolve from `baseUrl` in development and production alike, so serve images from `public/`.
- **Controls are `<button>` elements** with accessible names, so they work with a keyboard. Hotspot wrappers carry `data-hotspot-key` instead of an `id`.
- The title bar no longer sets `font-size` on every `h1` on the page.

Also new in 1.0: `autorotateEnabled` works without an `AutoRotateButton`, the viewer rebuilds when its `data` changes, and apps served from a sub-path work via `baseUrl`.

## License

MIT
