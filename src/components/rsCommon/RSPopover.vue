<script lang="ts" setup>
import type { Ref } from 'vue'
import {
  onMounted, onUnmounted, ref, watch,
} from 'vue'
import { useMediaQuery } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue: boolean
  position?: string
  fixed?: boolean
  openOnHover?: boolean
  addCursor?: boolean
  observeRef?: HTMLElement | null
  observeContainer?: HTMLElement | null
}>(), {
  position: 'bottom-middle',
  fixed: false,
  openOnHover: false,
  addCursor: true,
})
const emits = defineEmits(['update:modelValue'])
const popoverContent = ref(null) as Ref<HTMLElement | null>
const popoverStyle = ref('')
const clickable = ref(null) as Ref<HTMLElement | null>
const recalculateStuff = () => {
  const c = clickable.value
  if (c) {
    let newVal = ''
    if (props.fixed) {
      const child = c.children[0]

      if (!child)
        return

      newVal = 'position: fixed; top: 0; left: 0;'
      const x = (child.getBoundingClientRect().left + child.getBoundingClientRect().right)
        / 2
      const y = (child.getBoundingClientRect().top)
      newVal += `transform: translate(${x}px, ${y}px)
          translate(-85%, calc(-100% - 16px));`
    }
    else {
      newVal = 'position: absolute; top: 0; left: 0;'
      if (props.position.includes('bottom-')) {
        const x = (c.getBoundingClientRect().left + c.getBoundingClientRect().right) / 2
        const y = (c.getBoundingClientRect().top) + window.scrollY
        newVal += `transform: translate(${x}px, ${y}px)`
        if (props.position === 'bottom-middle')
          newVal += 'translate(-50%, calc(-100% - 16px));'
        else if (props.position === 'bottom-right')
          newVal += 'translate(-85%, calc(-100% - 16px));'
        else if (props.position === 'bottom-left')
          newVal += 'translate(-35%, calc(-100% - 16px));'
      }
      else if (props.position.includes('top-')) {
        const x = (c.getBoundingClientRect().left + c.getBoundingClientRect().right) / 2
        const y = (c.getBoundingClientRect().bottom) + window.scrollY
        newVal += `transform: translate(${x}px, ${y}px)`
        if (props.position === 'top-middle')
          newVal += 'translate(-50%, calc(16px));'
        else if (props.position === 'top-right')
          newVal += 'translate(-85%, calc(16px));'
      }
    }
    popoverStyle.value = newVal
  }
}
watch(
  () => props.modelValue,
  (val: boolean) => {
    if (val)
      recalculateStuff()
  },
)
const listener = (ev: MouseEvent) => {
  if (props.modelValue && !popoverContent.value?.contains(ev.target as Node)
    && !clickable.value?.contains(ev.target as Node))
    emits('update:modelValue', false)
}
let intersectionObs: IntersectionObserver | null = null
onMounted(() => {
  if (props.observeContainer && props.observeRef) {
    if (intersectionObs)
      intersectionObs.disconnect()

    intersectionObs = new IntersectionObserver((entries) => {
      if (entries.length && props.modelValue) {
        if (!entries[0].isIntersecting)
          emits('update:modelValue', false)
      }
    }, {
      root: props.observeContainer,
      threshold: 0.75,
    })

    intersectionObs.observe(props.observeRef)
  }

  document.addEventListener('scroll', recalculateStuff, true)
  document.body.addEventListener('click', listener)
})
onUnmounted(() => {
  document.removeEventListener('scroll', recalculateStuff, true)
  document.body.removeEventListener('click', listener)
  if (intersectionObs)
    intersectionObs.disconnect()
})

const popoverHovered = ref(false)
let lastToggle = -1
const togglePopover = (to?: boolean) => {
  lastToggle = new Date().getUTCMilliseconds()
  let changeTo = !props.modelValue
  if (to !== undefined)
    changeTo = to

  emits('update:modelValue', changeTo)
}

const isMobile = useMediaQuery('(max-width: 1200px)')
const popoverClicked = (ev: MouseEvent) => {
  togglePopover()
}

const isTouch = ref(false)

const handleHover = (ev: MouseEvent) => {
  if (!props.openOnHover)
    return

  if (!isMobile.value) {
    togglePopover(true)
    isTouch.value = true
  }
}

const hoverAway = () => {
  if (!props.openOnHover)
    return

  if (isTouch.value)
    return

  const usedToggle = lastToggle
  setTimeout(() => {
    if (lastToggle === usedToggle && !popoverHovered.value)
      togglePopover(false)
  }, 500)
}

const handlePopoverHover = () => {
  popoverHovered.value = true
}

const handlePopoverLeave = () => {
  popoverHovered.value = false
}
</script>

<template>
  <span ref="clickable" class="clickable" :class="{ cursor: addCursor }" @click="popoverClicked($event)"
    @mouseover="handleHover($event)" @mouseleave="hoverAway()">
    <slot name="clickable" />
    <teleport to="body">
      <div v-if="modelValue" ref="popoverContent" class="popover" :style="popoverStyle" :class="position"
        @mouseover="handlePopoverHover()" @mouseleave="handlePopoverLeave()">
        <slot />
      </div>
    </teleport>
  </span>
</template>

<style scoped lang="scss">
.clickable {
  position: relative;
  width: fit-content;
}

.cursor {
  cursor: pointer;
}

.popover {
  z-index: 100;
  font-family: "runescape uf", Avenir, Helvetica, Arial, sans-serif;
  color: #FFFF00;
  position: absolute;
  max-width: 200px;
  font-size: 24px;
  background-color: #544b40;
  padding: 14px 12px;
  border-radius: 12px;
  z-index: 1001;
  //border-width: 3px;
  //border-color: #8b6333;
  //border-style: solid;

  @media screen and (max-width: 700px) {
    max-width: 180px;
  }

  @media screen and (max-width: 450px) {
    max-width: 140px;
  }

  box-shadow: 3px 5px 5px 3px rgba(0, 0, 0, 0.35);

  &[class*=bottom] {
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      top: calc(100% - 2px);
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;

      border-top: 20px solid #544b40;

      -webkit-filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.35));
    }
  }

  &[class*=top] {
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      top: -18px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;

      border-bottom: 20px solid #544b40;

      -webkit-filter: drop-shadow(0 -4px 4px rgba(0, 0, 0, 0.35));
    }
  }

  &.bottom-right {
    &::after {
      left: 85%;
    }
  }

  &.bottom-left {
    &::after {
      left: 15%;
    }
  }
}
</style>
