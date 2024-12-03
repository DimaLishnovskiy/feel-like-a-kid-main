<script lang="ts" setup>
import {
    computed, inject, onMounted, ref, watch,
} from 'vue'
import RSDialog from './RSDialog.vue'
import RSPopover from './RSPopover.vue'
import RSInput from './RSInput.vue'
import RSTextArea from './RSTextArea.vue'
import RSButton from './RSButton.vue'

import { useMediaQuery } from '@vueuse/core';
import { contactUsOptions } from '@/utils/constants';

const DEBOUNCE_DELAY = 150;
const isMobile = useMediaQuery('(max-width:820px)')

const validEmail = ref(false)
const email = ref('')
const loading = ref(false)
const inquiry = ref('')
const incorrectEmailPopoverState = ref(false)
const showIncorrectEmailPopover = computed({
    get: () => incorrectEmailPopoverState.value,
    set: () => ({}),
})
const disabledButton = computed(() => !validEmail.value || !inquiry.value || loading.value)
const inquiryStatus = ref('')
const submitInquiry = async () => {
    loading.value = true
    try {
        const body = {
            email: email.value,
            message: inquiry.value,
        }
        await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        inquiryStatus.value = 'success'
    }
    catch (err) {
        inquiryStatus.value = 'error'
        console.error(err)
    }
    finally {
        loading.value = false
    }
}

const showEmailPopover = () => {
    if (!validEmail.value) {
        incorrectEmailPopoverState.value = true

        setTimeout(() => incorrectEmailPopoverState.value = false, 4000)
    }
}

const goToMessenger = () => {
    window.open('https://m.me/gamingtheballhardsway')
}



const redirect = (link) => {
    if (link) window.open(link);
}

const isHidden = ref(isMobile);

const buttonRef = ref();
const {buttonPosition} = inject<any>('ctaButtonPosition');
const {showDialog, handleShowDialog} = inject<any>('showCustomInquiry');

onMounted(() => {
    let timeout = null;
    if (isMobile.value) {
        const checkContactUsOverlap = () => {
            let res = false;
            for (const key in buttonPosition) {
                let btnYposition = buttonPosition[key];

                if (btnYposition.value) {
                    btnYposition = btnYposition.value.getBoundingClientRect().top + window.pageYOffset;
                } else {
                    btnYposition = btnYposition.getBoundingClientRect().top + window.pageYOffset;
                }

                const range = buttonPosition[key].range || 80;

                if (!res) {
                    res = Math.abs((window.pageYOffset + window.innerHeight - 120) - Math.abs(btnYposition)) <= range;
                }
            }

            isHidden.value = res;
        }
        setTimeout(() => checkContactUsOverlap(), DEBOUNCE_DELAY)
        window.onscroll = (() => {
            clearTimeout(timeout)
            timeout = setTimeout(checkContactUsOverlap, DEBOUNCE_DELAY)
        })
    }
})

</script>

<template>
    <div v-if="!isHidden" id="inquiry-button" ref="buttonRef" class="inquiry-button" @click="() => handleShowDialog(true)">
        <div align="center" class="support">
            <p style="text-shadow: 1px 1px 1px #000;" class="runescape !text-[16px] lg:!text-[24px] !text-[#FFFF00]">Contact Us</p>
            <div class="support-btn relative" ref="buttonRef">
                <img class="block hover:opacity-0" src="@/assets/icons/email.png">
                <img class="block absolute top-1/2 opacity-0 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:opacity-100" src="@/assets/icons/email-hover.png">
            </div>
        </div>
    </div>
    <RSDialog :show="showDialog" title="Custom Inquiry" :no-footer="true" @update:show="(event) => handleShowDialog(event)">
        <div class="absolute bottom-auto avatar top-[120px] hidden lg:block pt-1 border border-[#52493D] rounded-full overflow-hidden">
            <img src="@/assets/images/dev-avatar.png" class="w-[116px]"/>
        </div>
        <div class="max-w-[720px] runescape-mini leading-4 !text-[16px] lg:leading-[24px] lg:!text-[24px] lg:mt-16 mx-auto text-white">
           <div class="flex flex-row-reverse gap-4 items-center">
                <div>
                    <p class="mb-4 lg:mb-6">Hi!</p>
                    <p class="">Don’t hesitate to reach out to our 24/7 customer support team via your preferred communication channel down below:</p>
                </div>
                <div class="lg:hidden block overflow-hidden border border-[#52493D] min-w-[80px] w-max rounded-full">
                    <img src="@/assets/images/dev-avatar.png" class="w-[80px]"/>
                </div>
           </div>
            <ul class="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between gap-4 w-full mt-6 lg:mt-10">
                <li
                    v-for="item in contactUsOptions"
                    :key="item.title"
                    @click="() => redirect(item.link)"
                    style="
                        box-shadow: 0px 4px 4px 0px #00000040;
                        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
                    "
                    :style="{
                        backgroundColor: item.disabled ? '#84807D' : '#53493F',
                        pointerEvents: item.disabled ? 'none' : 'all',
                        opacity: item.disabled ? .4 : 1,
                        color: item.disabled ? '#CDCDCD' : '#FF981F'
                    }"
                    class="w-[calc(50%-16px)] hover:!bg-[#7E674F] duration-200 ease-linear lg:w-full cursor-pointer rounded-[12px] bg-[#53493F] px-[35px] py-5 flex flex-col items-center"
                >
                    <img class="mb-3" :src="item.image"/>
                    <p class="text-[16px] text-center lg:text-[18px]">{{ item.title }}</p>
                </li>
            </ul>

            <div class="bg-[#5B534580] h-[1px] w-full my-6 lg:my-8"/>

            <form class="inquiry-form">
                <p class="text-[#FF981F]">Email Us</p>
                <div class="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between mt-4 lg:mt-6 mb-4">
                    <RSInput
                        class="w-full lg:w-[35%]"
                        v-model="email" size="large" placeholder="Your email address" type="email"
                        @valid="validEmail = $event"
                    />
                    <RSInput
                        class="!hidden lg:!block w-full lg:w-[64%]"
                        v-model="inquiry" size="large" placeholder="Your message" type="text"
                    />
                    <RSTextArea
                        class="!block lg:!hidden w-full lg:w-[64%]"
                        v-model="inquiry" size="large" placeholder="Your message" type="text"
                    />
                </div>
                <div v-if="inquiryStatus === 'success'" class="success-message">
                    Your inquiry has been submitted!
                </div>
                <div v-if="inquiryStatus === 'error'" class="error-message">
                    There was an error while submitting your enquiry. Please try again later.
                </div>
                <div class="w-full flex justify-center lg:justify-end">
                    <RSPopover v-model="showIncorrectEmailPopover" position="bottom-middle">
                        <template #clickable>
                            <RSButton
                                :disabled="disabledButton" @click="submitInquiry()"
                                @disabled-click="showEmailPopover()"
                            />
                        </template>
                        Provided email is invalid
                    </RSPopover>
                </div>

                <div class="bg-[#5B534580] h-[1px] w-full my-6 lg:my-8"/>

                <div class="flex items-end lg:block">
                    <div>
                        <p class="mb-3">
                            Looking forward to handling your inquiry and helping you dominate online and leave all the noobs in the dust!
                        </p>
                        <p>To Your Gaming Gainz,</p>
                        <p>Tomas</p>
                        <p>Chief Customer Support Officer</p>
                   </div>
                </div>
            </form>

        </div>
    </RSDialog>
</template>

<style scoped lang="scss">
.support {
    position: fixed !important;
    right: 16px;
    bottom: 20px;
}

.avatar {
    left: 90px;

    @media (max-width: 1160px) {
        left: 5%;
    }

    @media (max-width: 1080px) {
        left: 20px;
    }
}

.support-btn {
    background: rgba(64, 56, 46, 0.5);
    border: 1px solid rgba(91, 83, 69, 1);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 16px 24px;
    border-radius: 999px;
}

.contact-us-buttons {
    position: fixed;
    bottom: 10px;
    right: 8px;

    @media screen and (max-width: 1022px) {
        bottom: 8px;
        right: 8px;
    }

    display: flex;
    align-items: center;
    gap: 24px;
    border-radius: 999px;
    border: 1px solid #5B5345;
    background: rgba(64, 56, 46, 0.50);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(2.5px);
    padding: 8px 24px;
    z-index: 10;
    justify-content: flex-end;

    @media (max-width: 500px) {
        padding: 4px 16px;
        width: 100%;
        max-width: 100%;
        right: 0;
        justify-content: space-around;
        border-radius: 4px 4px 0px 0px;
        border-top: 1px solid #5B5345;
        background: rgba(64, 56, 46, 0.50);
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        backdrop-filter: blur(2px);
        right: 0;
        bottom: 0;
    }

    &.small-contact-us-buttons {
        @media (max-width: 500px) {
            width: inherit;
            border-radius: 999px;
            border: 1px solid #5B5345;
            background: rgba(64, 56, 46, 0.50);
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
            backdrop-filter: blur(2.5px);
            right: 16px;
            bottom: 16px;
        }
    }
}

.inquiry-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 62px;
    height: 48px;
    position: fixed;
    right: 24px;
    cursor: pointer;
    bottom: 24px;
    z-index: 1000;
}

.inquiry-dialog {
    width: 100%;
    color: #FFF;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.2px;
    margin-top: 28px;
    font-family: "runescape uf";
}

.inquiry-form {
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    .text-area {
        // width: 60%;
        margin: 24px 0;
    }
}

.success-message {
    color: #00FF00;
}

.error-message {
    color: #DC143C;
}

.mc-widget {
    margin: 24px 0;
    text-shadow: none;
    width: fit-content !important;
}

.chat-bubble-filler {
    width: 64px;
    height: 64px;

    @media screen and (max-width: 500px) {
        width: 60px;
        flex-grow: 1;
        max-width: 60px;
    }
}

.btn-wrap {
    @media screen and (max-width: 500px) {
        max-width: 256px;
        flex-grow: 1;
    }

    width: 256px;
}
</style>
