<template>
  <div ref="toggleElement" class="scene-list-toggle">
    <button
      type="button"
      class="marzipano-button cursor-pointer"
      :aria-expanded="isOpen"
      aria-label="Scenes"
      @click="toggleSceneList"
    >
      <img src="../assets/img/street-view-solid.svg" alt="" />
    </button>

    <ul ref="listElement" class="scene-list" :class="{ open: isOpen }">
      <li v-for="item in scenes" :key="item.data.id" :data-id="item.data.id">
        <button
          type="button"
          class="scene cursor-pointer"
          :class="{ current: currentScene === item }"
          :aria-current="currentScene === item ? 'true' : undefined"
          @click="handleClick(item)"
        >
          <span class="scene-text">{{ item.data.name }}</span>
          <img
            v-if="currentScene === item"
            class="scene-icon"
            src="../assets/img/eye-regular.svg"
            alt=""
          />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onMounted, ref } from 'vue';
  import { useMarzipano } from '../composables/useMarzipano';
  import type { SceneData, ViewerScene } from '../types';

  const emits = defineEmits<{
    'select-scene': [scene: SceneData];
  }>();

  const { scenes, currentScene, switchScene } = useMarzipano();
  const isOpen = ref(false);
  const toggleElement = ref<HTMLElement | null>(null);
  const listElement = ref<HTMLElement | null>(null);

  // Switches scene itself, so the list also works when you place it in one of the viewer's slots
  const handleClick = (item: ViewerScene) => {
    switchScene(item);
    emits('select-scene', item.data);
  };

  function toggleSceneList() {
    isOpen.value = !isOpen.value;
  }

  const offsetPosition = ref('-500px');
  onMounted(() =>
    nextTick(() => {
      // Calculate the offscreen position dynamically based on content size
      if (!toggleElement.value || !listElement.value) return;
      const left = window.getComputedStyle(toggleElement.value).getPropertyValue('left');
      offsetPosition.value = `calc(-${listElement.value.offsetWidth}px - ${left} - 50px)`;
    }),
  );
</script>

<style scoped>
  .scene-list-toggle {
    position: absolute;
    bottom: 10%;
    left: 40px;
  }

  .scene-list {
    z-index: 5;
    position: absolute;
    bottom: 100%;
    left: v-bind(offsetPosition); /* Default value */
    transition: left 1s ease; /* Smooth transition when changing the left property */
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .scene-list.open {
    left: 0; /* Ending position at 50px from the left */
  }

  .scene-list .scene {
    width: 100%;
    border: 0;
    font: inherit;
    text-align: start;
    background-color: white;
    opacity: 0.7;
    padding: 1rem;
    display: flex;
    align-items: center;
  }

  .scene-list .scene.current {
    opacity: 1;
  }

  .scene-list .scene .scene-text {
    padding-right: 1rem;
  }

  .scene-list .scene .scene-icon {
    align-self: center;
    height: 20px;
  }
</style>
