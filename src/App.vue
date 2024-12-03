<script setup>
import { computed, onMounted, provide, reactive, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { sendPixel } from './utils/facebookUtils';
import CustomInquiry from '@/components/rsCommon/CustomInquiry.vue'

onMounted(() => {
  setTimeout(() => {
    sendPixel('PageView')
    window.gtag('page_view')
  }, 300)
})

const buttonPosition = reactive({});
const showDialog = ref(false);
const handleShowDialog = (status) => {
  showDialog.value = status;
}

provide('ctaButtonPosition', {
  buttonPosition,
  updateButtonPosition: (key, newVal) => {
    buttonPosition[key] = newVal;
  }
});

provide('showCustomInquiry', {
  showDialog: computed(() => showDialog.value),
  handleShowDialog
});
</script>

<template>
  <RouterView />
  <CustomInquiry />
</template>

<style scoped></style>
