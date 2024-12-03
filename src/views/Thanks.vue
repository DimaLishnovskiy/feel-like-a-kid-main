<script lang="ts" setup>
import thanksBg from '@/assets/images/thanks-bg.png';
import Divider from '@/components/Divider.vue';
import Logo from '@/components/Logo.vue';
import { sendPixel } from '@/utils/facebookUtils';
import { onMounted } from 'vue';

onMounted(() => {
  sendPixel('Lead')
  window.gtag('lead')
})
</script>
<template>
  <div>
    <div :style="{ 'background-image': `url(${thanksBg})` }"
      class="mobile:px-[21px] mobile:static mobile:h-[70vh] h-[100vh] w-full bg-no-repeat bg-top bg-cover relative flex flex-col items-center justify-center">
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
        class="mobile:w-[60vw] mobile:clip-side-shadow-thanks-mobile h-[100vh] clip-side-shadow-thanks absolute left-0 top-0 w-[55vw] bg-[rgba(1,1,1,0.5)]" />

      <div
        class="mobile:absolute mobile:top-[45%] mobile:left-1/2 mobile:-translate-x-1/2 mobile:-translate-y-1/2 z-10 w-full">
        <Divider class="mobile:max-w-[90%]" />

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
          class="golden-text mobile:leading-8 mobile:text-[32px] text-[48px] leading-[48px] text-center text-[#F36C00] uppercase">
          Adventure Awaits!
        </h2>

        <h4 class="mobile:max-w-[300px] max-w-[644px] mx-auto text-white text-center">
          <h4 v-motion="{
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
          }"
            class="mobile:text-[16px] mobile:max-w-[300px] mobile:mx-auto mobile:mb-3 mobile:mt-4 text-[32px] mt-10 mb-8 text-center w-full max-w-[644px] capitalize">
            Hit us up via Facebook Messenger to receive your account log in details and embark on a journey back to your
            childhood.</h4>
          <h4 v-motion="{
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
          }"
            class="mobile:text-[16px] mobile:max-w-[300px] mobile:mx-auto mobile:mb-3 mobile:mt-4 text-[32px] mt-10 mb-8 text-center w-full max-w-[644px] capitalize">
            Feel like a kid again!
          </h4>
          <h4 v-motion="{
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
          }"
            class="mobile:text-[16px] mobile:max-w-[300px] mobile:mx-auto mobile:mb-3 mobile:mt-4 text-[32px] mt-10 mb-8 text-center w-full max-w-[644px] capitalize">
            Complete the childhood challenge in 7 days and win 33$!</h4>
          <h4 v-motion="{
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
          }"
            class="mobile:text-[16px] mobile:max-w-[300px] mobile:mx-auto mobile:mb-3 mobile:mt-4 text-[32px] mt-10 mb-8 text-center w-full max-w-[644px] capitalize">
            Now, reach out to us so we can send you the account detaills.
          </h4>
        </h4>
        <a v-motion="{
          initial: {
            opacity: 0,
            scale: 0.2,
            translateY: -10
          },
          visibleOnce: {
            opacity: 1,
            scale: 1,
            translateY: 0
          }
        }" :duration="500" :transition="{
          ease: 'linear'
        }" href="https://m.me/gamingtheballhardsway?ref=w27881324" target="_blank"
          class="cursor-pointer rounded-lg px-10 max-w-[220px] py-3 flex mx-auto mt-6 items-center justify-around"
          style="background: linear-gradient(180deg, #fcd763 0%, #e1a106 100%)">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="14" fill="url(#paint0_radial_1_273)" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4.65002 13.7187C4.65002 8.50841 8.7336 4.64923 13.9999 4.64923C19.2663 4.64923 23.3499 8.51075 23.3499 13.721C23.3499 18.9312 19.2663 22.7904 13.9999 22.7904C13.0533 22.7904 12.1463 22.6642 11.2931 22.4304C11.1272 22.386 10.9495 22.3977 10.7929 22.4678L8.93696 23.286C8.45077 23.501 7.9038 23.1551 7.88743 22.6244L7.83601 20.9602C7.83133 20.7545 7.73783 20.5628 7.5859 20.4272C5.76734 18.8003 4.65002 16.4442 4.65002 13.7187ZM11.1317 12.0146L8.38515 16.3717C8.12102 16.7901 8.63526 17.2599 9.02796 16.9607L11.9779 14.7214C12.1765 14.5695 12.4524 14.5695 12.6534 14.7191L14.8389 16.3577C15.4957 16.8485 16.4307 16.6779 16.8678 15.9837L19.6167 11.629C19.8785 11.2105 19.3643 10.7384 18.9716 11.0376L16.0217 13.2769C15.823 13.4288 15.5472 13.4288 15.3462 13.2792L13.1606 11.6406C12.5038 11.1498 11.5688 11.3204 11.1317 12.0146Z"
              fill="white" />
            <defs>
              <radialGradient id="paint0_radial_1_273" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(5.39 27.8497) scale(30.5088 30.5061)">
                <stop stop-color="#0099FF" />
                <stop offset="0.6098" stop-color="#A033FF" />
                <stop offset="0.9348" stop-color="#FF5280" />
                <stop offset="1" stop-color="#FF7061" />
              </radialGradient>
            </defs>
          </svg>
          <p class="leading-6 text-[24px] uppercase plain-font underline" style="
                background: radial-gradient(
                  108.96% 108.95% at 19.25% 99.46%,
                  #0099ff 0%,
                  #a033ff 60.98%,
                  #ff5280 93.48%,
                  #ff7061 100%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              ">
            Let`s chat
          </p>
        </a>
        <Divider class="mobile:max-w-[90%]" />
      </div>
    </div>
  </div>

  <footer
    class="z-20 relative mobile:h-[30vh] mobile:pb-10 mobile:text-[16px] h-[25vh] pb-[70px] flex flex-col justify-between text-[32px]">
    <div class="flex h-full justify-center items-end">
      <Logo />
    </div>
  </footer>
</template>
