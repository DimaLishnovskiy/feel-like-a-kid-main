<script setup>
import EmailButton from '@/components/EmailButton.vue';
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isMainRoute = computed(() => route.path === '/')
</script>

<template>
  <div class="mc-button" v-if="isMainRoute">
    <p class="text-yellow-400 font-[RuneScape UF] text-[24px] font-normal leading-[24px]">Contact Us</p>
    <EmailButton link="https://m.me/gamingtheballhardsway"  />
  </div>

</template>

<style scoped>
.mc-button {
  position: fixed;
  flex-direction: column;
  bottom: 50px;
  right: 32px;
  width: 120px;
  height: 80px;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 60px;
  height: 60px;
}

@media screen and (max-width: 800px) {
  .mc-button {
    bottom: 50px;
    right: 32px;
    width: 100px;
    height: 80px;
  }

  img {
    width: 40px;
    height: 40px;
  }
}
</style>
