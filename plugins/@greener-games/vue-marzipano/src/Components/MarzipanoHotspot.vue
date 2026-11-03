<template>
  <div :data-hotspot-id="String(hotspotInfo.id)">
    <component :is="hotspotType" :hotspot="hotspotInfo" />
  </div>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, resolveComponent } from 'vue';
  import type { Component } from 'vue';
  import NavigationHotspot from './Hotspots/NavigationHotspot.vue';
  import type { RenderedHotspot } from '../types';

  const props = defineProps<{
    hotspotInfo: RenderedHotspot;
  }>();

  const hotspotType = computed<Component>(() => {
    const type = props.hotspotInfo.type;
    if (!type) return NavigationHotspot;

    const component = resolveComponent(type);
    if (typeof component !== 'string') return component;

    // Not registered globally: look for a built-in hotspot component of that name. Imported
    // from the Hotspots subdirectory so this file can't match (and import) itself.
    return defineAsyncComponent({
      loader: () => import(`./Hotspots/${type}.vue`) as Promise<Component>,
      loadingComponent: NavigationHotspot,
      errorComponent: NavigationHotspot,
    });
  });
</script>
