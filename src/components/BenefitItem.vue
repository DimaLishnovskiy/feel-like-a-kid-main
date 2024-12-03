<script setup lang="ts">
import Divider from '@/components/Divider.vue'
defineProps(['showDivider', 'image', 'content'])
</script>
<template>
  <div class="w-full relative">
    <div
      v-motion="{
        initial: {
          opacity: 0,
          translateY: -40,
          scale: 1.2
        },
        visibleOnce: {
          opacity: 1,
          translateY: 0,
          scale: 1
        }
      }"
      :duration="600"
      :transition="{
        ease: 'linear'
      }"
      class="mobile:gap-6 mobile:h-auto flex items-center justify-between w-full gap-12 h-[67px]"
    >
      <img :src="image" class="mobile:w-10 mobile:h-10 object-contain" />
      <h3
        class="plain-font mobile:text-[16px] mobile:leading-4 text-[32px] max-w-[555px] leading-8 text-[#FFFF00] text-center"
      >
        {{ content }}
      </h3>
      <img
        :src="image"
        class="mobile:w-10 mobile:h-10 object-contain"
        style="transform: rotateY(180deg)"
      />
    </div>
    <Divider v-if="showDivider" :class="'max-w-[610px] mobile:hidden'" />
  </div>
</template>
