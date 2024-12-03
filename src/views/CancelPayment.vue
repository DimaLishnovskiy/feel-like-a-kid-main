<script lang="ts" setup>

import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import cancelBg from '@/assets/images/cancel-bg.png';
import Divider from '@/components/Divider.vue';
import Logo from '@/components/Logo.vue';
import goBackBtn from '@/assets/images/go-back-btn.png'

const router = useRouter();
const route = useRoute();

const paymentId = computed(() => route.query.id);

const isActive = ref(false);
const loading = ref(false);

const checkStatus = () => {
  loading.value = true;
  fetch(`${import.meta.env.VITE_BACKEND}/stripe/subscriptions/status?id=${paymentId.value}`)
    .then(res => res.text())
    .then(res => {
      isActive.value = res !== 'canceled';
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(() => {
  if (paymentId.value) {
    checkStatus()
  }
})

const onCancel = () => {
  fetch(`${import.meta.env.VITE_BACKEND}/stripe/subscriptions/${paymentId.value}/cancel`)
    .then(() => {
      checkStatus()
    })
}

const headerText = computed(() => loading.value ? 'Loading...' : (isActive.value ? 'Are you sure you want to cancel your payment?' : 'The subscription has already been cancelled'))

</script>

<template>
  <div>
    <div :style="{ 'background-image': `url(${cancelBg})` }"
      class="mobile:px-[21px] mobile:static mobile:h-[80vh] h-[100vh] w-full bg-no-repeat bg-top bg-cover relative flex flex-col items-center justify-center">
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
        class="mobile:w-[60vw] mobile:clip-side-shadow-thanks-mobile h-[100vh] clip-side-shadow-thanks absolute left-0 top-0 w-[55vw] bg-[rgba(1,1,1,0.7)]" />

      <div
        class="mobile:absolute mobile:top-[45%] mobile:left-1/2 mobile:-translate-x-1/2 mobile:-translate-y-1/2 z-10 w-full">
        <Divider class="mobile:max-w-[90%]" />

        <div class="max-w-[388px] mx-auto text-white text-center">
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
            class="mobile:text-[16px] mobile:max-w-[300px] mobile:mx-auto mobile:mb-3 mobile:mt-4 text-[32px] mt-10 mb-8 text-center w-full max-w-[388px] capitalize">
            {{ headerText }}
          </h4>
          <template v-if="!loading">
            <img v-if="isActive" @click="router.push('/')" class="mt-8 mb-4 mx-auto cursor-pointer" :src="goBackBtn"
              alt="go-back-btn" />
            <p v-if="isActive" @click="onCancel"
              class="text-[#FBE8BD] mobile:text-[16px] underline text-[20px] cursor-pointer">
              Yes, cancel my payment
            </p>
            <p v-if="!isActive" @click="router.push('/')"
              class="text-[#FBE8BD] mobile:text-[16px] underline text-[20px] cursor-pointer">
              Go back
            </p>
          </template>
        </div>

        <Divider class="mobile:max-w-[90%]" />
      </div>
    </div>

    <footer
      class="z-20 relative mobile:h-[20vh] mobile:pb-10 mobile:text-[16px] h-[25vh] pb-[70px] flex flex-col justify-between text-[32px]">
      <div class="flex h-full justify-center items-end">
        <Logo />
      </div>
    </footer>
  </div>
</template>