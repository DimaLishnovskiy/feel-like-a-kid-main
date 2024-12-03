<script lang="ts" setup>
defineProps<{
  label: string;
  id: string;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
}>()
const model = defineModel()
const emits = defineEmits(['keyupEmit'])
</script>
<template>
  <div class="mobile:max-w-full max-w-[500px]">
    <label
      v-if="label"
      :htmlFor="id"
      v-motion="{
        initial: {
          opacity: 0,
          translateX: -40
        },
        visibleOnce: {
          opacity: 1,
          translateX: 0
        }
      }"
      :duration="400"
      :transition="{
        ease: 'linear'
      }"
      class="mobile:mb-2 text-[#FFAE4A] block mb-3 text-start uppercase"
      >{{ label }}</label
    >
    <input
      v-motion="{
        initial: {
          opacity: 0
        },
        visibleOnce: {
          opacity: 1
        }
      }"
      :duration="1000"
      :transition="{
        ease: 'linear'
      }"
      v-model="model"
      class="input p-3 text-[#FFAE4A] placeholder:text-[#FFAE4A] rounded-sm"
      :class="{error: !!error}"
      :id="id"
      :placeholder="placeholder"
      @keyup="(e) => emits('keyupEmit', e)"
    />
    <p class="text-[#C7332A] mt-1.5" v-if="error && errorMessage">{{ errorMessage }}</p>
  </div>
</template>
<style scoped>
.input {
  background: #372d20;
  width: 100%;
  outline: none;
  box-shadow:
    2px 2px 4px 0px #111111d9 inset,
    -1px -1px 1px 0px #f5f5f580 inset;
}

.input:hover {
  box-shadow:
    -1px -1px 1px 0px #ffae4a inset,
    2px 2px 4px 0px #111111d9 inset;
}

.input:focus {
  box-shadow:
    -1px -1px 1px 0px #ff981f inset,
    2px 2px 2px 0px #111111d9 inset,
    3px 3px 0px 1px #ff981f33;
}
.input.error {
  box-shadow:
    2px 2px 4px 0px #111111d9 inset,
    -1px -1px 1px 0px #C7332A inset;
  color: #C7332A;
}
</style>
