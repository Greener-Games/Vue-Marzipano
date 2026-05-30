<template>
  <div class="navigationButton cursor-pointer" @click="toggle()">
    <img :src=imageSrc alt="">
  </div>
</template>

<script setup lang="ts">
import {useFullscreen} from '@vueuse/core'
import {computed, inject} from "vue";
import {GetImage} from "../helpers";

const props = defineProps({
  buttonData : Object,
})

const panoElement = inject('panoElement')
const {toggle} = useFullscreen(panoElement)

const imageSrc = computed(() =>  GetImage(props.buttonData?.imageName))

</script>

<style scoped>
</style>