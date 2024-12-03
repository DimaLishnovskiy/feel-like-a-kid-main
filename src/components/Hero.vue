<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'

import heroBg from '@/assets/images/hero.png';
import heroBgMobile from '@/assets/images/hero-mobile.png';


const isMobile = useMediaQuery('(max-width:820px)')
const router = useRouter()
</script>
<template>
  <div
    :style="{ 'background-image': `url(${isMobile ? heroBgMobile : heroBg})` }"
    class="h-[90vh] mobile:h-[110vh] w-full bg-no-repeat bg-top bg-cover relative mobile:px-[21px]"
  >
    <div
      v-motion="{
        initial: {
          opacity: 0.4,
          translateX: -300
        },
        enter: {
          opacity: 1,
          translateX: 0
        }
      }"
      :duration="400"
      :transition="{
        ease: 'linear'
      }"
      class="mobile:justify-start mobile:pt-[30px] relative max-w-[1200px] m-[auto] z-10 flex flex-col h-[100vh] content-wrapper"
    >
      <h1
        v-motion="{
          initial: {
            opacity: 0,
            translateX: -500
          },
          enter: {
            opacity: 1,
            translateX: 0
          }
        }"
        :duration="300"
        :delay="200"
        :transition="{
          ease: 'linear'
        }"
        class="
        title golden-text mobile:text-[43px] mobile:max-w-[500px] mobile:mx-auto text-pretty
        mobile:mb-[20px] mobile:leading-[40px] mobile:text-left mt-20 mb-20 text-[64px] uppercase
        max-w-[730px] leading-[64px] z-30
"
      >
        Feel Like A Kid Again -  Order Kickstarter Account For $19.99!
      </h1>
      <div
        v-motion="{
          initial: {
            opacity: 0,
            translateX: -500
          },
          enter: {
            opacity: 1,
            translateX: 0
          }
        }"
        :duration="300"
        :delay="400"
        :transition="{
          ease: 'linear'
        }"
      >
        <p class="text-shadow text-[#FEF9E4] text-2xl">Save 20 Hours of Early Boring Grind and Re-Play</p>
        <p class="text-shadow text-[#FEF9E4] text-2xl">Your Childhood Tonight!</p>
      </div>
      <p
        v-motion="{
          initial: {
            opacity: 0,
            translateX: -400
          },
          enter: {
            opacity: 0.85,
            translateX: 0
          }
        }"
        :duration="300"
        :delay="600"
        :transition="{
          ease: 'linear'
        }"
        class="text-[#F5F5F5] opacity-85 text-[16px] font-extralight"
      >
        *You Can Now Play Runescape On Mobile!
      </p>
<!--      <Button @click="router.push('/sign-up')" :class="'mobile:scale-125'">Get Free Account</Button>-->
    </div>
    <div
      v-motion="{
        initial: {
          opacity: 0,
          translateX: -300
        },
        enter: {
          opacity: 1,
          translateX: 0
        }
      }"
      :duration="400"
      :transition="{
        ease: 'linear'
      }"
      class="mobile:clip-side-shadow-mobile mobile:w-[70vw] clip-side-shadow fixed h-full left-0 top-0 w-[60vw] bg-[rgba(1,1,1,0.7)]"
    />
  </div>
</template>

<style scoped>
.title {
  letter-spacing: 4px;
}

@media screen and (max-width: 375px) and (max-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  .title {
    margin: 0 auto !important;
  }
  .content-wrapper {
    padding-top: 50px !important;
  }
}
.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
}
</style>
