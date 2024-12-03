<script lang="ts" setup>
import { computed, defineProps } from 'vue'
const props = defineProps<{
  progress: number
  fade: boolean
}>()

const progressFinal = computed(() => Math.floor(Math.min(100, props.progress * 100)) || 0)
</script>

<template>
  <div class="loader" :class="{ fade }">
    <div class="outer">
      <div class="inner">
        <div class="bar" :style="{
          width: `calc(${progressFinal}% - 4px)`,
        }" />
        <div class="text">
          Loading up - {{ progressFinal }}%
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #52483e;
  background-image: url('../../assets/bg.png');
  background-size: cover;
  background-position: center;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: opacity 0.5s ease-in-out;

  &.fade {
    opacity: 0
  }
}

.outer {
  background-color: #8D1310;
  width: 300px;
  height: 60px;
  padding: 2px;
}

.inner {
  background-color: black;
  padding: 1rem 4rem;
  width: 100%;
  height: 100%;
  position: relative;
}

.bar {
  height: 96%;
  z-index: 8;
  position: absolute;
  margin-right: 2px;
  left: 2px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #8D1310;

  transition: width 0.1s ease-in-out;
}

.text {
  font-family: "runescape uf", Avenir, Helvetica, Arial, sans-serif;
  font-size: 22px;
  text-align: center;
  letter-spacing: 1px;
  width: 100%;
  color: white;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
