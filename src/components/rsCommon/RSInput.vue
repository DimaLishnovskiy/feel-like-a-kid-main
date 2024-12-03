<script lang="ts" setup>
import type { Ref } from 'vue'
import {
  computed, onMounted, onUnmounted, ref,
} from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder: string
  type?: string
  size?: string
  label?: string
  labelWidth?: string
  allowDecimal?: boolean
}>(), {
  type: 'text',
  size: 'medium',
  label: '',
  labelWidth: '',
  allowDecimal: true,
})
const emits = defineEmits([
  'update:modelValue',
  'valid',
  'keypress',
  'focus',
  'blur',
])
const input = ref(null) as Ref<HTMLInputElement | unknown>
const text = computed({
  get: () => props.modelValue,
  set: (val: string) => { emits('update:modelValue', val) },
})
const showPassword = ref(false)
const computedType = computed(() => {
  if (props.type !== 'password')
    return props.type
  return showPassword.value ? 'text' : props.type
})
const validate = () => {
  const inp = input.value as HTMLInputElement
  if (props.type === 'email'
    && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.value)) {
    inp.setCustomValidity('Bad email input')
    emits('valid', false)
  }
  else {
    inp.setCustomValidity('')
    emits('valid', true)
  }
  emits('blur')
}
const computedPattern = computed(
  () => {
    if (props.type === 'number')
      return props.allowDecimal ? '\\d*' : '[0-9]*'

    return '.*'
  },
)
const handler = (ev: KeyboardEvent) => {
  emits('keypress', ev.key)
}
onMounted(() => {
  if (input.value) {
    const i = input.value as HTMLInputElement
    i.addEventListener('keypress', handler)
  }
})
onUnmounted(() => {
  if (input.value) {
    const i = input.value as HTMLInputElement
    i.removeEventListener('keypress', handler)
  }
})

const onFocus = (ev: FocusEvent) => {
  emits('focus', ev.target)
}
</script>

<template>
  <div style="display: inline-block; position: relative">
    <span v-if="label" :class="size" class="label" :style="labelWidth ? `width: ${labelWidth}` : ''">
      {{ label }}
    </span>
    <div class="input-container">
      <input v-if="type === 'number' && !allowDecimal" ref="input" v-model="text" :placeholder="placeholder"
        :type="computedType" :class="size" :pattern="computedPattern" min="0" step="1"
        onfocus="this.previousValue = this.value" onkeydown="this.previousValue = this.value"
        oninput="validity.valid || (value = this.previousValue)" @compositionupdate="text = $event.data"
        @focus="onFocus($event)" @blur="validate()">
      <input v-else ref="input" v-model="text" :placeholder="placeholder" :type="computedType" :class="size"
        :pattern="computedPattern" @compositionupdate="text = $event.data" @focus="onFocus($event)" @input="validate()"
        @blur="validate()">
    </div>
  </div>
</template>

<style scoped lang="scss">
::placeholder {
  font-family: "RuneScape Plain 12";
  font-size: 20px !important;
  color: #9F9F9F;
  text-shadow: 1px 1px 0px #000;
  transition: all ease 200ms;
}

input {
  font-family: "RuneScape Plain 12";
  padding-left: 8px;
  border-radius: 6px;
  border: 1px solid #63594A;
  background: #534C42;
  box-shadow: 0px 0px 0px 1px #2E2B24;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 110% */
  letter-spacing: 1px;
  width: 100%;
  padding: 100px;
  padding: 16px 12px !important;
  transition: all ease 200ms;
}

input:hover, input:active, input:focus {
  color: #FFFF00;
  background: #7E674F;

  &::placeholder {
    color: #FFFF00;
  }
}

input:invalid {
  border-color: red;
}

input.medium {
  font-size: 16px;
}

input.large {
  font-size: 24px;
  padding: 2px 9px;

  &::placeholder {
    text-align: start;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    /* 75% */
    letter-spacing: 1.2px;
  }
}

.label {
  display: block;
  margin-right: 4px;
  margin-bottom: 8px;

  &.medium {
    font-size: 16px;
  }

  &.large {
    font-size: 24px;
  }
}

.show-password-icon {
  width: 24px;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

.input-container {
  display: inline-block;
  position: relative;
  width: 98%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
