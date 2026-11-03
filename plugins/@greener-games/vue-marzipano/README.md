# @greener-games/vue-marzipano

A Vue 3 wrapper for the [Marzipano](https://www.marzipano.net/) 360° panorama viewer. You describe your scenes, hotspots and controls in one data object, and `<MarzipanoViewer>` renders the tour: scene switching, link and info hotspots, auto-rotate, fullscreen, zoom and look controls, and a scene list.

## Install

```sh
npm install @greener-games/vue-marzipano
```

Vue 3 is a peer dependency. `marzipano` and `@vueuse/core` are installed with the package.

## Set up

Register the plugin and import its stylesheet once, in `main.ts`:

```ts
import { createApp } from 'vue';
import App from './App.vue';
import VueMarzipano from '@greener-games/vue-marzipano';
import '@greener-games/vue-marzipano/style.css';

const app = createApp(App);
app.use(VueMarzipano, { env: import.meta.env });
app.mount('#app');
```

`env` is only needed when tiles load from the cloud (see `cloud` below). A published library can't read your app's `import.meta.env` itself, so pass it in. Any other option you pass is forwarded to the Marzipano viewer constructor.

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

- **Tiles** are read from `/tiles/<scene id>/` on your site, in the layout the [Marzipano tool](https://www.marzipano.net/tool/) exports. Put them in your app's `public/tiles/`.
- **Cloud tiles:** set `cloud: { enabled: true, url: 'https://…', key: 'VITE_TILE_SAS' }`. Tiles then load from `url`, with the value of the env variable named by `key` appended as a query string.
- **Image paths** (`imageName`, `imageOn`, `icons…`) resolve from your site root, so `img/plus.png` means `public/img/plus.png`. Full URLs work too.
- **Navigation buttons:** `NavigateButton` takes `zoomFactor`, `xFactor` (degrees) or `yFactor` (degrees). Every button takes an optional `label` for its accessible name; a sensible one is derived when you leave it out.
- A link hotspot can set `imageOverride`, and a scene can set `navigationViewParameters` for the view used when you arrive through a hotspot.

All of these types are exported: `MarzipanoData`, `SceneData`, `LinkHotspot`, `InfoHotspot`, `NavigationButton` and more.

## Custom hotspots and buttons

A hotspot's `type`, or a button's, is the name of a globally registered component. That component receives the hotspot as its `hotspot` prop, or the button as `buttonData`, including any extra fields you add:

```ts
app.component('InfoHotspot', InfoHotspot);
```

```vue
<script setup lang="ts">
  import type { InfoHotspot } from '@greener-games/vue-marzipano';
  defineProps<{ hotspot: InfoHotspot }>();
</script>
```

Inside the viewer, `useMarzipanoContext()` gives a custom component the viewer's state (`currentScene`, `viewer`, `data`…) and `viewFunctions.switchScene()`. `useMarzipano()` returns the viewer's full controls, including `lookTo()` and `setFov()`.

## Slots

`<MarzipanoViewer>` has three slots to replace its built-in UI: `titleBar`, `contentButtons` (the control bar) and `scenes` (the scene list).

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

The ref exposes `enableAutoRotate`, `currentScene`, `scenes`, `switchScene`, `findSceneById`, `findSceneDataById`, `lookTo` and `setFov`.

Each `<MarzipanoViewer>` keeps its own state, so you can put several on one page.

## Migrating from 0.x

1.0.0 contains breaking changes:

- **`useMarzipano()` only works inside a `<MarzipanoViewer>`.** It used to return one shared, global viewer. From outside a viewer, use a template ref (above).
- **CSS class names are kebab-case:** `titleBar` → `title-bar`, `sceneName` → `scene-name`, `sceneList` → `scene-list`, `sceneListToggle` → `scene-list-toggle`, `navigationButton` → `navigation-button`, `autorotateToggle` → `autorotate-toggle`. Update any overrides.
- **Image paths no longer get a `/src/` prefix on `localhost`.** Paths resolve from the site root in development and production alike, so serve images from `public/`.
- **Pass your env to the plugin** (`app.use(VueMarzipano, { env: import.meta.env })`) if you use cloud tiles.
- **Controls are `<button>` elements** with accessible names, so they work with a keyboard. Hotspot wrappers carry `data-hotspot-id` instead of an `id`.
- The title bar no longer sets `font-size` on every `h1` on the page.

## License

MIT
