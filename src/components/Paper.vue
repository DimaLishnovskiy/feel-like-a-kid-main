<script setup lang="ts">
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import paperStartBg from '@/assets/images/paper-start.png'
import paperEndBg from '@/assets/images/paper-end.png'

import mobilePaperStart from '@/assets/images/mobile-paper-start.png'
import mobilePaperEnd from '@/assets/images/mobile-paper-end.png'

const { height, startHeightProp, endHeightProp } = defineProps({
  height: {
    type: Number,
    default: 1000
  },
  paperStart: {
    type: String,
    default: paperStartBg
  },
  paperEnd: {
    type: String,
    default: paperEndBg
  },
  startHeightProp: Number,
  endHeightProp: Number
})

const isMobile = useMediaQuery('(max-width:820px)')

const startHeight = computed(() => startHeightProp || height * 0.72)
const endHeight = computed(() => endHeightProp || height * 0.28)


</script>

<template>
  <div
    v-motion="{
      initial: {
        height: 160
      },
      enter: {
        height: height
      }
    }"
    class="relative z-30 mx-auto w-full max-w-[1100px] paper-wrapper"
  >
    <img
      draggable="false"
      v-motion="{
        initial: {
          height: startHeight
        },
        visibleOnce: {
          height: startHeight
        }
      }"
      :duration="2000"
      :transition="{
        ease: 'linear'
      }"
      :src="isMobile ? mobilePaperStart : paperStart"
      alt="mobile-paper"
      class="object-top object-cover absolute top-0 w-full min-w-full"
    />
    <img
      v-motion="{
        initial: {
          top: startHeight - 5,
          height: endHeight
        },
        visibleOnce: {
          top: startHeight - 5,
          height: endHeight
        }
      }"
      :duration="2000"
      :transition="{
        ease: 'linear'
      }"
      :src="isMobile ? mobilePaperEnd : paperEnd"
      class="object-bottom object-cover absolute w-full min-w-full"
    />
    <div
      draggable="false"
      class="mobile:min-w-[340px] absolute top-[80px] left-1/2 -translate-x-1/2 min-w-[854px]"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
img {
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -o-user-select: text;
  user-select: text;
}
</style>
