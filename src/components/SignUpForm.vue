<script lang="ts" setup>
import { computed, ref } from 'vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import { useRouter } from 'vue-router';
import { sendPixel } from '@/utils/facebookUtils';

import disclaimerPaper from '@/assets/images/disclaimer-paper.png'

const API = import.meta.env.VITE_BACKEND;
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const PRICE = 19.99;
const EMAIL_REGEXP = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const router = useRouter();

const email = ref();
const orderUuidPayPal = ref('');
const isEmailSubmitted = ref(false);
const loadingStripe = ref(false);
const processingPayment = ref(false);
const errorMessage = ref('');

const orderId = ref();
const elements = ref();

const isEmailValid = computed(() => email.value && EMAIL_REGEXP.test(email.value))

// @ts-expect-error Stripe does not exist error — but it does
const stripe = Stripe(STRIPE_PK)

const onPay = async () => {
  processingPayment.value = true;
  sendPixel('InitiateCheckout')
  window.gtag('initiate_checkout')
  try {

    const { error: submitError } = await elements.value.submit();
    if (submitError) {
      console.log('Submit error');
      return;
    }

    const res = await fetch(`${API}/stripe/intents/setup`, {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        price: PRICE,
        currency: 'USD',
        // for now it is empty, probably in the future we will have something here
        extraData: {}
      })
    })

    const { clientSecret } = await res.json();

    // orderId.value = id

    const { error } = await stripe.confirmSetup({
      elements: elements.value,
      clientSecret,
      confirmParams: {
        return_url: `${API}/thanks`
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "An unexpected error occurred.";
    }



    if (error || !orderId.value || !elements.value) return;

    await fetch(`${API}/stripe/createOrder`, {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        price: PRICE,
        orderData: [],
        currency: 'USD',
        stripeOrderId: orderId.value,
      }),
    })
  } finally {
    processingPayment.value = false;
  }
}

const onSubmit = async () => {
  if (loadingStripe.value || processingPayment.value) return;
  if (!isEmailValid.value) return;
  if (isEmailSubmitted.value) {
    await onPay();
    return;
  }
  sendPixel('AddToCart')
  window.gtag('add_to_cart')
  const res = await fetch(`${API}/submit`, {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
    }),
  })
  if (Math.floor(res.status / 100) === 2)
    router.push(`/thanks`)

  // isEmailSubmitted.value = true;

  // loadingStripe.value = true;
  // const appearance = {
  // theme: 'night',
  // }
  // elements.value = stripe.elements({ appearance, mode: 'setup', currency: 'usd' })

  // const paymentElementOptions = {
  // layout: 'tabs',
  // style: {
  // base: {
  // color: '#fff',
  // },
  // },
  // }

  // const paymentElement = elements.value.create('payment', paymentElementOptions)
  // paymentElement.mount('#payment-element')

  // loadingStripe.value = false;
}
</script>
<template>
  <form @submit.prevent.enter="onSubmit" class="mobile:px-6 flex flex-col items-center">
    <p v-motion="{
      initial: {
        opacity: 0,
        translateY: -100,
        scale: 0.8
      },
      visibleOnce: {
        opacity: 1,
        scale: 1,
        translateY: 0
      }
    }" :duration="500" :transition="{
      ease: 'linear'
    }" style="
        background: -webkit-linear-gradient(180deg, #fcd763 0%, #e1a106 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: 2px;
      " class="mobile:text-[32px] uppercase text-[48px] text-center">
      Order Your Account
    </p>

    <div class="mobile:my-8 mobile:gap-5 w-full mx-auto max-w-[500px] mt-16 flex flex-col gap-8 mb-10">
      <Input :error="isEmailSubmitted && !isEmailValid" v-model="email" id="email-field"
        placeholder="Your email address" label="email" @keyupEmit="() => {
          isEmailSubmitted = false;
        }" :errorMessage="'The entered email is not a valid email address'" />
      <div v-if="isEmailSubmitted" style="border: 1px solid #F36C00; border-radius: 2px;"
        class="mobile:w-full w-[400px] mx-auto py-4 px-6 bg-black disclaimer transition-all duration-200 flex items-center justify-between gap-2">
        <img :src="disclaimerPaper" alt="paper" />
        <p class="mobile:text-[12px] leading-4 text-[#F36C00] text-center text-[16px]">FREE Trial lasts 7 days. Cancel
          at anytime for any reason and you won't be billed a penny. At the end of your trial you will be billed $19.99
        </p>
      </div>
    </div>


    <div class="paypal-container">
      <div id="paypal-btns" />
    </div>

    <div :class="`${orderId ? 'mobile:mb-8 w-full max-w-[500px] mb-10' : ''}`" id="payment-element"></div>

    <Button>{{ (loadingStripe || processingPayment) ? 'Loading' : (isEmailSubmitted ? 'Start Free Trial' : 'Order now')
      }}</Button>
  </form>
</template>

<style scoped>
#paypal-btns {
  margin-bottom: 30px;
}

.disclaimer:hover {
  background: linear-gradient(180deg, rgba(252, 215, 99, 0.15) 0%, rgba(225, 161, 6, 0.25) 100%);
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
