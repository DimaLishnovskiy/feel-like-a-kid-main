<script lang="ts" setup>
import {
  computed, onMounted, ref, watch,
} from 'vue'

const props = withDefaults(defineProps<{
  show: boolean
  title: string
  spaceFromRight?: boolean
  noFooter?: boolean
  contentMargin?: number
}>(), {
  spaceFromRight: false,
  noFooter: false,
  contentMargin: 0,
})
const emits = defineEmits(['update:show'])
const dialog = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const fontSize = ref(28)
const showC = computed({
  get: () => props.show,
  set: (val: boolean) => {
    emits('update:show', val);
  },
})
const closeIfOutside = (ev: PointerEvent) => {
  if (!ev.composedPath().find((x: EventTarget) => x === dialog.value))
    showC.value = false
}
const reevaluateSize = () => {
  const titleElement = titleRef.value as HTMLElement
  if (!titleElement)
    return

  const currentHeight = titleElement.clientHeight
  const currentFontSize = +window.getComputedStyle(titleElement).fontSize.replace('px', '')
  if (currentFontSize * 2 < currentHeight) {
    const nextSize = currentFontSize - 1
    if (nextSize < 40 && nextSize > 8) {
      fontSize.value = nextSize
      setTimeout(() => reevaluateSize(), 0)
    }
  }
  else {
    const nextSize = currentFontSize - 1
    if (nextSize < 40 && nextSize > 8)
      fontSize.value = nextSize
  }
}

watch(() => showC.value, (val) => {
    if (val) {
      document.body.style.overflow = 'hidden';
      document.querySelector('html').style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.querySelector('html').style.overflow = 'auto';
    }
}, {
  immediate: true,
})

watch(() => titleRef.value, (ref: HTMLElement | null) => {
  if (ref)
    reevaluateSize()
}, {
  immediate: true,
})

watch(() => props.title, (title: string) => {
  if (title)
    reevaluateSize()
}, {
  immediate: true,
})

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) {
            showC.value = false;
        }
    })
})
</script>

<template>
  <teleport to="body">
    <figure v-if="showC" class="dialog" @click="closeIfOutside">
      <div ref="dialog" class="dialog-window safari-only">
        <div class="dialog-window-inner-wrapper">
          <div class="dialog-container">
            <div class="dialog-content" :class="{
              'space-from-right': spaceFromRight,
            }" :style="{
              'margin-top': `${contentMargin || 0}px`,
            }">
              <div class="dialog-header  w-full z-30 sticky top-[-1px] bg-[#40382E] py-4">
                <div ref="titleRef" class="title lg:!justify-center">
                  <h3
                    class="runescape relative variable-title text-start lg:text-center coach-achievement-text"
                    style="
                      color:#FF981F !important;
                      text-shadow: 1px 1px 1px #000;
                    "
                  >
                    <slot
                      name="title"
                    >
                      <img class="absolute left-[-6px] w-[15px] lg:w-auto top-[-8px] lg:left-[-13px] lg:top-[-14px]" src="@/assets/images/Royal Crown 1.png"/>
                      {{ title }}
                    </slot>
                  </h3>
                </div>
                <div class="close-button" @click="showC = !showC" >
                  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.71881 15.7617L1.431 16.0462L1.71881 16.3307L5.71881 20.2845L5.97561 20.5383L6.25431 20.3087L12 15.576L17.7457 20.3087L18.0244 20.5383L18.2812 20.2845L22.2812 16.3307L22.569 16.0462L22.2812 15.7617L17.569 11.104L22.2812 6.44627L22.5617 6.16899L22.2884 5.88461L18.2884 1.72282L18.0264 1.45021L17.7395 1.69648L12 6.62308L6.26053 1.69648L5.97362 1.45021L5.71161 1.72282L1.71161 5.88461L1.43828 6.16899L1.71881 6.44627L6.431 11.104L1.71881 15.7617Z" fill="#FF981F" stroke="black" stroke-width="0.8"/>
                  </svg>
                </div>
              </div>
              <slot />
            </div>
            <div v-if="!noFooter" class="dialog-footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </figure>
  </teleport>
</template>

<style scoped lang="scss">
.variable-title {
  font-size: 40px;
  @media (max-width: 820px) {
    font-size: 28px;
  }
}
.dialog {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1);
  width: 100%;
  height: 100dvh;
  z-index: 1000;
  margin: 0 !important;
  font-family: "runescape uf", Avenir, Helvetica, Arial, sans-serif;

  pointer-events: auto;

  &-window {
    display: flex;
    max-width: 1200px;
    width: 100%;
    max-height: 900px;
    height: 100%;
    background-size: 100% 100%;
    background: #40382E;
    border: 1px solid #5B5345;
    border-radius: 12px;

    @media screen and (max-width: 700px) {
      max-height: 90vh;
      width: 90vw;
    }

    &-inner-wrapper {
      width: 100%;
    }
  }

  &-container {
    box-sizing: border-box;
    padding: 0 8px 8px;
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    pointer-events: auto;
  }

  &-header {
    width: 100%;
    box-sizing: border-box;

    .title {
      color: #DC143C;
      font-size: 28px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
    }

    .close-button {
      position: absolute;
      right: 8px;
      top: 8px;
      cursor: pointer;
      border: 1px solid #5B5345;
      padding: 10px;
      border-radius: 12px;
      box-shadow: 0px 4px 4px 0px #00000040;

      svg, path {
        transition: all ease 200ms;
      }

      &:hover {
        svg, path {
          fill: rgba(255, 192, 119, 1);
        }
      }
    }
  }

  &-content {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 8px 4px 8px;
    font-size: 24px;
    color: #FFFF00;
    overflow-y: auto;
    -webkit-overflow-scrolling: auto;

    &.space-from-right {
      box-sizing: content-box;
      padding: 8px 0 4px 16px;
      width: 95%;

      @media screen and (max-width: 700px) {
        box-sizing: border-box;
        padding: 0px 0 4px 8px;
        width: 100%;
      }
    }

    @media screen and (max-width: 700px) {
      font-size: 22px;
    }

    @media screen and (max-width: 450px) {
      font-size: 20px;
      padding-top: 0;
    }
  }

  &-footer {
    width: 100%;
    min-height: 32px;
    margin: 8px 0px 8px 16px;
  }
}
</style>
