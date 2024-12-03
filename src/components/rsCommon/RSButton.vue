<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'RSButton',
  props: {
    size: {
      type: String,
      default: 'medium',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: undefined,
    },
  },
  emits: ['click', 'disabledClick'],
  setup(props) {
    const computedWidth = computed(
      () => (props.width ? `width: ${props.width}px` : ''),
    )
    return {
      computedWidth,
    }
  },
})
</script>

<template>
  <div style="display: inline-block">
    <div class="button" :class="[size, { disabled }]" :style="computedWidth"
      @click="$emit(disabled ? 'disabledClick' : 'click', $event)">
    </div>
  </div>
</template>

<style scoped lang="scss">
.button {
  background-image: url('@/assets/images/submit-btn.png');
  display: flex;
  justify-content: center;
  align-items: center;
  width: 164px;
  height: 48px;

  &:hover {
    background-image: url('@/assets/images/submit-btn-hover.png');
    background-size: cover;
  }

  @media (max-width: 820px) {
    background-image: url(@/assets/images/submit-btn-mb.png);
    width: 295px;
    height: 48px;

    &:hover {
      background: url(@/assets/images/submit-btn-mb.png) !important;
    }
  }

  & * {
    user-select: none;
  }

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    opacity: 0.7;
    cursor: auto;

    &:hover {
      background-image: url('../../assets/images/submit-btn.png');
    }
  }
}

.button-text {
  font-family: "runescape uf", Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  color: #FFFF00;
}
</style>
