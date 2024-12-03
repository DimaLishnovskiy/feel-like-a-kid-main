<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'RSTextArea',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 3,
    },
    label: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: String,
      default: '',
    },
    noWidthSet: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const text = computed({
      get: () => props.modelValue,
      set: (val: string) => { context.emit('update:modelValue', val) },
    })
    return {
      text,
    }
  },
})
</script>

<template>
  <div style="position: relative;">
    <span v-if="label" class="label" :style="labelWidth ? `width: ${labelWidth}` : ''">
      {{ label }}
    </span>
    <div class="input-container">
      <textarea :value="text" :placeholder="placeholder" :rows="rows" style="resize: none" :class="{
        'with-width': !noWidthSet,
      }" @input="text = ($event.target! as any).value" />
    </div>
  </div>
</template>

<style scoped lang="scss">
::placeholder {
  font-family: "RuneScape Plain 12";
  font-size: 24px;
  color: #c2c2c2;
  text-shadow: 1px 1px 0px #000;
}

textarea {
  font-family: "RuneScape Plain 12";
  padding-top: 14px;
  padding-left: 14px;
  leading-trim: both;
  text-edge: cap;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  /* 110% */
  letter-spacing: 1px;
  border-radius: 2px;
  border: 1px solid #63594A;
  background: #534C42;
  box-shadow: 0px 0px 0px 1px #2E2B24;
  width: 100%;
  min-height: 215px;

  &:active, &:focus {
    color: #FFFF00;
    &::placeholder {
      color: #FFFF00 !important;
    }
    background: #7E674F;
  }

  &::placeholder {
    color: #9F9F9F;
    font-size: 20px;
  }
}

.label {
  display: block;
  margin-right: 4px;
}

.input-container {
  display: inline-block;
  position: relative;
  width: 98%;
}
</style>
