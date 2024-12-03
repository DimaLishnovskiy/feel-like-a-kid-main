import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import { loadScript } from '@paypal/paypal-js'
const app = createApp(App)


loadScript({
  currency: 'USD',
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  vault: true,
  intent: 'subscription',
}).then(() => {
  app.use(router)

  app.use(MotionPlugin)

  app.mount('#app')
})

