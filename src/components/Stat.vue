<script setup lang="ts">
defineProps({
  icon: String,
  label: String,
  delay: Number
})
</script>

<template>
  <div
    class="flex items-center gap-x-3"
  >
    <img :src="icon" alt="icon" class="mobile:w-[30px] object-contain mobile:h-[30px]" />
    <p class="mobile:text-[16px] text-nowrap text-[32px]">{{ label }}</p>
  </div>
</template>
