<script setup >
const {  link = 'mailto:support@ballhardsden.com'  } = defineProps(['link'])
import emailIcon from '@/assets/icons/email.png'
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
    style="box-shadow: 0 4px 4px 0 #00000040"
    class="bg-[rgba(91,83,69,0.25)] mobile:max-w-full mobile:py-6 mobile:w-full w-[110px] flex justify-center mt-4 py-4 rounded-full"
  >
    <button
      class="text-[20px] hover:scale-110 hover:opacity-90 ease duration-300 text-white relative bg-cover w-[254px] h-[54px] bg-no-repeat"
    >
      <p class="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2">
        <a :href="link" target="_blank">
          <img :src="emailIcon" alt="email icon" />
        </a>
      </p>
    </button>
  </div>
</template>
