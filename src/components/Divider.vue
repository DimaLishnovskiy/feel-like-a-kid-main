<script setup lang="ts">
defineProps(['class', 'delay'])
</script>
<template>
  <div
    style="box-shadow: 0px 0px 4px 0px rgba(0, 200, 0, 0.2)"
    class="mobile:my-10 mobile:mb-8 my-[40px] bg-[rgba(121,115,37,1)] h-[2px] w-full max-w-[610px] relative left-1/2 -translate-x-1/2"
    :class="class"
  />
</template>
