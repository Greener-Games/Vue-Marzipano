<template>
  <div :id="hotspotInfo?.id">
    <component
        :is="hotspotType"
        :hotspot="hotspotInfo"/>
  </div>

</template>

<script setup lang="ts">
import {computed, defineAsyncComponent, defineProps, resolveComponent} from 'vue';
import NavigationHotspot from "./NavigationHotspot.vue";

const props = defineProps({
  hotspotInfo: Object,
})
const hotspotType = computed(() => {
      const type = props.hotspotInfo?.type;

      let component;
      if (type) {
        component = resolveComponent(type);

        // If resolveComponent doesn't return a valid component, use defineAsyncComponent
        if (component === null || component === undefined || typeof component === 'string') {
          component = defineAsyncComponent({
            loader: () => import(`./${type}.vue`),
            loadingComponent: NavigationHotspot,
            errorComponent: NavigationHotspot,
          })
        }
      }
      return component && typeof component !== 'string' ? component : NavigationHotspot;
    }
)
</script>

<style scoped lang="scss">

</style>