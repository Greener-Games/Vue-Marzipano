<template>
  <div class="h-full w-full">
    <!-- Every built-in piece of UI is replaced. The components in the slots sit inside the
         viewer, so they drive it with useMarzipano(). -->
    <MarzipanoViewer :data="data">
      <template #titleBar>
        <TourHeader :menu-open="menuOpen" @toggle-menu="menuOpen = !menuOpen" />
      </template>

      <template #contentButtons>
        <TourToolbar />
        <TourSceneStepper />
      </template>

      <template #scenes>
        <TourSceneMenu :open="menuOpen" @close="menuOpen = false" />
      </template>
    </MarzipanoViewer>
  </div>
</template>

<script setup lang="ts">
  import { MarzipanoViewer } from '@greener-games/vue-marzipano';
  import { ref } from 'vue';
  import TourHeader from '@/components/tour/TourHeader.vue';
  import TourSceneMenu from '@/components/tour/TourSceneMenu.vue';
  import TourSceneStepper from '@/components/tour/TourSceneStepper.vue';
  import TourToolbar from '@/components/tour/TourToolbar.vue';
  import { data } from '@/data/data';

  const menuOpen = ref(false);
</script>
