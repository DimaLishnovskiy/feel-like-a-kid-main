<script setup lang="ts">
import signUpBg from '@/assets/images/sign-up-bg.png'
import clock from '@/assets/images/benefits/clock.png'
// import coins from '@/assets/images/benefits/coins.png'
import direction from '@/assets/images/benefits/direction.png'
// import letter from '@/assets/images/benefits/letter.png'

import BenefitItem from '@/components/BenefitItem.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import Divider from '@/components/Divider.vue'
import Logo from '@/components/Logo.vue'
import { inject, onMounted, provide } from 'vue'

const benefits = [
  {
    image: clock,
    content: 'Account Will Be Delivered Immediately After You Place Your Order Down Below'
  },
  // {
  //   image: letter,
  //   content: 'If You Wish To Return The Account, Cancel The Trial Using The Link We Email You.'
  // },
  // {
  //   image: coins,
  //   content: 'Complete The Childhood Challenge And Win $33 Coupon'
  // },
  {
    image: direction,
    content: ' You Can Return The Account Back In 7 Days For All Of Your Money Back'
  }
];

const {handleShowDialog} = inject<any>('showCustomInquiry');


onMounted(() => {
  scrollTo(0, 0);
})
</script>
<template>
  <div>
    <div :style="{ 'background-image': `url(${signUpBg})` }"
      class="mobile:min-h-full mobile:px-[21px] mobile:pt-[50px] w-full pt-[100px] bg-no-repeat bg-top bg-cover relative flex flex-col items-center">
      <div v-motion="{
        initial: {
          opacity: 0,
          translateX: -300
        },
        enter: {
          opacity: 1,
          translateX: 0
        }
      }" :duration="400" :transition="{
        ease: 'linear'
      }"
        class="mobile:w-[60vw] mobile:clip-side-shadow mobile:h-[180vh] max-h-[2400px] clip-side-shadow-sign-up absolute h-full left-0 top-0 w-[50vw] bg-[rgba(1,1,1,0.75)]" />
      <h2 v-motion="{
        initial: {
          opacity: 0,
          scale: 0.5,
          translateY: -100
        },
        visibleOnce: {
          opacity: 1,
          scale: 1,
          translateY: 0
        }
      }" :duration="500" :transition="{
        ease: 'linear'
      }" style="letter-spacing: 2px;"
        class="plain-font mobile:max-w-[310px] mobile:mb-10 mobile:leading-8 mobile:text-[32px] text-[48px] leading-[48px] text-[#F36C00] mb-2 text-center max-w-[406px] uppercase">
        Start Free “Feel Like A Kid” Trial
      </h2>

      <div class="z-20 mobile:gap-6 max-w-[780px] mobile:mt-0 mt-11 w-full mx-auto flex flex-col gap-10">
        <BenefitItem v-for="(benefit, index) in benefits" :key="index" :image="benefit.image" :content="benefit.content"
          :showDivider="index < benefits.length - 1" />
      </div>

      <Divider :class="'mobile:block hidden !my-[60px]'" />

      <div class="z-20 mobile:mt-0 max-w-[780px] w-full mx-auto mt-24 mb-12">
        <Divider :class="'mobile:hidden'" />
        <SignUpForm />

        <Divider />

        <div class="mx-auto text-white text-center flex items-center flex-col">
          <h4>If you have any questions, please reach out to us  <span class="underline cursor-pointer" @click="() => handleShowDialog(true)">Here</span></h4>
        </div>
      </div>
    </div>

    <footer
      class="z-20 relative mobile:text-[16px] mobile:h-[300px] h-[250px] pb-5 flex flex-col justify-between text-[32px]">
      <div class="flex justify-center h-full items-end">
        <Logo />
      </div>
    </footer>

  </div>
</template>

<style>
@media screen and (max-width: 800px) {
  .email-btn {
    width: 110px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
}

</style>
