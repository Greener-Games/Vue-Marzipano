<template>
  <Transition
    enter-active-class="motion-safe:transition motion-safe:duration-200"
    leave-active-class="motion-safe:transition motion-safe:duration-150"
    enter-from-class="opacity-0 ltr:-translate-x-4 rtl:translate-x-4"
    leave-to-class="opacity-0 ltr:-translate-x-4 rtl:translate-x-4"
  >
    <nav
      v-show="open"
      id="tour-scene-menu"
      class="glass absolute start-3 top-17 bottom-3 w-64 max-w-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl p-2"
      aria-label="Scenes"
    >
      <ul class="space-y-1">
        <li v-for="(scene, index) in scenes" :key="scene.data.id">
          <button
            type="button"
            class="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-start motion-safe:transition-colors"
            :class="
              scene === currentScene
                ? 'bg-primary text-white'
                : 'text-text-main hover:bg-bg-surface'
            "
            :aria-current="scene === currentScene ? 'true' : undefined"
            @click="select(scene)"
          >
            <span class="text-sm tabular-nums opacity-70">{{ index + 1 }}</span>
            <span class="truncate">{{ scene.data.name }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<script setup lang="ts">
  import { useMarzipano } from '@greener-games/vue-marzipano';
  import type { ViewerScene } from '@greener-games/vue-marzipano';

  defineProps<{
    open: boolean;
  }>();

  const emit = defineEmits<{
    close: [];
  }>();

  const { scenes, currentScene, switchScene } = useMarzipano();

  function select(scene: ViewerScene) {
    switchScene(scene);
    emit('close');
  }
</script>
