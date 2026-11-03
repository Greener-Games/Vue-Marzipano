<template>
  <button type="button" class="hotspot" :aria-label="label" @click="TriggerSceneSwitch">
    <img class="hotspot-img cursor-pointer" :src="imageSrc" alt="" />
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { GetImage } from '../../helpers';
  import { useMarzipanoContext } from '../../context';
  import type { LinkHotspot } from '../../types';

  const props = defineProps<{
    hotspot: LinkHotspot;
  }>();

  const { data, viewFunctions } = useMarzipanoContext();

  const imageSrc = computed(() =>
    props.hotspot.imageOverride
      ? GetImage(props.hotspot.imageOverride)
      : GetImage(data.icons?.defaultNavigationIcon),
  );

  const label = computed(() => {
    const target = viewFunctions.findSceneDataById(props.hotspot.target);
    return target ? `Go to ${target.name}` : 'Go to scene';
  });

  // Switch to the selected scene
  function TriggerSceneSwitch() {
    const scene = viewFunctions.findSceneById(props.hotspot.target);
    if (!scene) return;
    viewFunctions.switchScene(
      scene,
      scene.data.navigationViewParameters || scene.data.initialViewParameters,
    );
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
