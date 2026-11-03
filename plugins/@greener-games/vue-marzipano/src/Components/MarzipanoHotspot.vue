<template>
  <div :data-hotspot-key="hotspotKey">
    <component :is="hotspotType" v-if="hotspotType" :hotspot="hotspotInfo" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import NavigationHotspot from './Hotspots/NavigationHotspot.vue';
  import { resolveTypeComponent } from '../helpers';
  import type { RenderedHotspot } from '../types';

  const props = defineProps<{
    hotspotKey: string;
    hotspotInfo: RenderedHotspot;
  }>();

  const builtIns = { NavigationHotspot };

  // Link hotspots default to NavigationHotspot; info hotspots need a type the app registered
  const hotspotType = computed(() => {
    const type = props.hotspotInfo.type;
    if (!type) {
      console.warn(
        `[vue-marzipano] Hotspot "${props.hotspotInfo.id}" has no type, so it isn't shown. ` +
          'Set `type` to the name of a component you registered.',
      );
      return null;
    }
    return resolveTypeComponent(type, builtIns, 'hotspot');
  });
</script>
