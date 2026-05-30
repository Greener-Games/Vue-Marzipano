<template>
  <div class="marzipano-button sceneListToggle cursor-pointer" @click="toggleSceneList">
    <img v-if="isOpen" src="../assets/img/street-view-solid.svg">
    <img v-else src="../assets/img/street-view-solid.svg">

    <ul class="sceneList" :class="{open : isOpen}">
      <li v-for="item in data.scenes" :key="item.id" class="scene cursor-pointer"
          :data-id="item.id"
          :class="{current : currentScene?.data.id === item.id}" @click="handleClick(item)">
        <div class="scene-text">{{ item.name }}</div>
        <img v-if="currentScene?.data.id === item.id" class="scene-icon" src="../assets/img/eye-regular.svg"/>
      </li>
    </ul>

  </div>

</template>

<script setup>
import {inject, nextTick, onMounted, ref} from "vue";

const currentScene = inject('currentScene')
const data = inject('data')
const emits = defineEmits(['select-scene'])

const isOpen = ref(false)

const handleClick = (item) => {
  // Emit a custom event named 'custom-click' with optional payload
  emits('select-scene', item);
};

function toggleSceneList() {
  isOpen.value = !isOpen.value
}

const offsetPosition = ref(-500);
onMounted(() =>
    nextTick(() => {
          // Calculate the offscreen position dynamically based on content size
          const contentContainer = document.querySelector('.sceneList');
          const computedStyle = window.getComputedStyle(document.querySelector('.sceneListToggle'));
          offsetPosition.value = `calc(-${contentContainer.offsetWidth}px - ${computedStyle.getPropertyValue('left')} - 50px)`;
        }
    ))
</script>

<style scoped lang="scss">
.sceneListToggle {
  position: absolute;
  bottom: 10%;
  left: 40px;
}

.sceneList {
  z-index: 5;
  position: absolute;
  bottom: 100%;
  left: v-bind(offsetPosition); /* Default value */
  transition: left 1s ease; /* Smooth transition when changing the left property */

  padding: 0;
  margin: 0;

  &.open {
    left: 0px; /* Ending position at 50px from the left */
  }

  .scene {
    background-color: white;
    opacity: 0.7;
    padding: 1rem;
    display: flex;
    align-items: center;

    &.current {
      opacity: 1;
    }

    .scene-text {
      padding-right: 1rem;
    }

    .scene-icon {
      align-self: center;
      height: 20px;
    }
  }
}
</style>