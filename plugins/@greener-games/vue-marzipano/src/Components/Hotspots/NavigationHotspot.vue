<template>
  <button type="button" class="hotspot" :aria-label="label" @click="TriggerSceneSwitch">
    <img class="hotspot-img cursor-pointer" :src="imageSrc" alt="" />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useMarzipano } from '../../composables/useMarzipano';
  import { resolveImageUrl } from '../../helpers';
  import type { LinkHotspot } from '../../types';

  const props = defineProps<{
    hotspot: LinkHotspot;
  }>();

  const { data, findSceneById, findSceneDataById, switchScene } = useMarzipano();

  const imageSrc = computed(() =>
    resolveImageUrl(props.hotspot.imageOverride || data.value?.icons?.defaultNavigationIcon),
  );

  const label = computed(() => {
    const target = findSceneDataById(props.hotspot.target);
    return target ? `Go to ${target.name}` : 'Go to scene';
  });

  // Switch to the selected scene
  function TriggerSceneSwitch() {
    const scene = findSceneById(props.hotspot.target);
    if (!scene) return;
    switchScene(scene, scene.data.navigationViewParameters || scene.data.initialViewParameters);
  }
</script>

<style scoped>
  .hotspot {
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  .hotspot .hotspot-img {
    width: 100%;
    height: 100%;
  }
</style>
