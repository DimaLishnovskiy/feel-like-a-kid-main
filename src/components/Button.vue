<script setup lang="ts">
import buttonBg from '@/assets/icons/button.svg'

defineProps(['class'])
defineEmits(['click'])
</script>
<template>
  <div
    v-motion="{
      initial: {
        opacity: 0,
        scale: 0
      },
      enter: {
        opacity: 1,
        scale: 1
      }
    }"
    :duration="500"
    :delay="600"
    :transition="{
      ease: 'linear'
    }"
    style="box-shadow: 0px 4px 4px 0px #00000040"
    class="bg-[rgba(91,83,69,0.25)] mobile:max-w-full mobile:py-6 mobile:w-full w-[340px] flex justify-center mt-4 py-4 rounded-full"
  >
    <button
      @click="$emit('click')"
      class="text-[20px] hover:scale-110 hover:opacity-90 ease duration-300 text-white relative bg-cover w-[254px] h-[54px] bg-no-repeat"
      :class="class"
      :style="{
        background: `url(${buttonBg})`,
        'box-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }"
    >
      <p 
        class="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
      >
        <slot />
      </p>
    </button>
  </div>
</template>
