<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
const { monsters, hasSlider } = defineProps<{
  monsters: { image: string; label?: string }[]
  class?: string
  hasSlider?: boolean
}>()

const slider = ref<HTMLDivElement | null>(null)
const interval = ref<any>(null)

onMounted(() => {
  if (hasSlider) {
    let prevScroll = 0;
    interval.value = setInterval(() => {
      if (!slider.value) return
      if (slider.value.scrollLeft === prevScroll && slider.value.scrollLeft > 0) {
        slider.value.scrollLeft = 0
      } else slider.value.scrollLeft += 140
      prevScroll = slider.value.scrollLeft
    }, 3000)
  }
})

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})
</script>
<template>
  <div
    ref="slider"
    class="monsters mobile:px-2 pointer-events-none mobile:max-w-[340px] scroll-smooth overflow-x-scroll gap-10 my-5 flex items-end justify-center w-full"
    :class="class"
    style="scroll-bar-width: none"
  >
    <div
      v-for="(monster, index) in monsters"
      :key="index"
      v-motion="{
        initial: {
          opacity: 0.5,
          translateX: -20,
          scale: 0.8
        },
        visible: {
          opacity: 1,
          translateY: 0,
          translateX: 0,
          scale: 1
        }
      }"
      :duration="600"
      :transition="{
        ease: 'linear'
      }"
      class="min-w-[100px] flex flex-col items-center justify-center gap-4"
    >
      <img :src="monster.image" alt="monster" class="max-h-[140px]" />
      <p v-if="monster.label">{{ monster.label }}</p>
    </div>
  </div>
</template>

<style>
.monsters::-webkit-scrollbar {
  display: none;
}

.monsters {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
