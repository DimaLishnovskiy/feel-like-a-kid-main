<script setup lang="ts">
import Divider from '@/components/Divider.vue'

import arrowIcon from '@/assets/icons/arrow.png'

defineProps({
  class: String,
  title: String,
  delay: {
    type: Number,
    default: 0
  },
  showDivider: Boolean,
  titleClass: String,
})
</script>

<template>
  <div
    class="w-full"
    :class="class"
  >
    <div 
      class="mobile:mb-6 flex items-center justify-between w-full mb-6 mobile:justify-center"
      :class="titleClass"
    >
      <img
        v-motion="{
          initial: {
            opacity: 0.8,
            translateX: -30
          },
          visibleOnce: {
            opacity: 1,
            translateX: 0,
            transition: {
              repeat: Infinity,
              repeatType: 'mirror'
            }
          }
        }"
        :duration="1000"
        :transition="{
          ease: 'linear'
        }"
        :src="arrowIcon"
        alt="arrow"
        class="mobile:hidden"
      />
      <h4 class="mobile:text-2xl leading-10 text-[rgba(112,65,16,1)] text-[40px] uppercase">
        {{ title }}
      </h4>
      <div class="mobile:hidden w-20 h-1 opacity-0" />
    </div>

    <div
      class="relative left-1/2 -translate-x-1/2 text-center flex flex-col items-center"
    >
      <slot />
    </div>

    <Divider v-if="showDivider" />
  </div>
</template>
