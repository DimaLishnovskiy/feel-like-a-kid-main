<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import Hero from '@/components/Hero.vue'
import Paper from '@/components/Paper.vue'
import PaperItem from '@/components/PaperItem.vue'
import Stat from '@/components/Stat.vue'
import Logo from '@/components/Logo.vue'
import Divider from '@/components/Divider.vue'
import Button from '@/components/Button.vue'
import Monsters from '@/components/Monsters.vue'

import HP from '@/assets/icons/stats/hp.png'
import attack from '@/assets/icons/stats/attack.png'
import defense from '@/assets/icons/stats/defense.png'
import magic from '@/assets/icons/stats/magic.png'
import strength from '@/assets/icons/stats/strength.png'
import quests from '@/assets/icons/stats/quests.png'

import gear from '@/assets/images/gear.png'
import coins from '@/assets/images/coins.gif'
// import boss from '@/assets/images/boss.gif'

import killedBossBg from '@/assets/images/killed-boss.png'
import killedBossBgMobile from '@/assets/images/killed-boss-mobile.png'
import elvargBg from '@/assets/images/elvarg-bg.png'

import paperEndSecondary from '@/assets/images/paper-end-secondary.png'

import coupon from '@/assets/icons/coupon.svg'

import Ankou from '@/assets/images/monsters/Ankou.png'
import Dagannoth from '@/assets/images/monsters/Dagannoth.png'
import Hellhound from '@/assets/images/monsters/Hellhound.png'
import KalphiteGuardian from '@/assets/images/monsters/Kalphite_Guardian.png'
import Lesserdemon from '@/assets/images/monsters/Lesser_demon.png'
// import MossGiant from '@/assets/images/monsters/Moss_Giant.png'
import Ogre from '@/assets/images/monsters/Ogre.png'
import Obor from '@/assets/images/monsters/Obor.png'
import Bryophyta from '@/assets/images/monsters/Bryophyta.png'
import MossGiant2 from '@/assets/images/monsters/MossGiant2.png'
import Arrg from '@/assets/images/monsters/Arrg.png'
import BlueDragon from '@/assets/images/monsters/blue-dragon.png'
import FireGiant from '@/assets/images/monsters/fire-giant.png'
import Hobgoblin from '@/assets/images/monsters/hobgoblin.png'
import IceWarrior from '@/assets/images/monsters/Ice-warrior.png'
import LesserDemon2 from '@/assets/images/monsters/Lesser_demon2.png'
import ShadeKourend from '@/assets/images/monsters/shade-kourend.png'
import Shade from '@/assets/images/monsters/shade.png'

import footerBg from '@/assets/images/footer-bg.png'

import askQuestion from '@/assets/icons/ask-question.svg'

const isMobile = useMediaQuery('(max-width:820px)');
import logo from '@/assets/logo.png'

const monstersPrimary = [
  {
    image: Ankou,
    label: '40-90'
  },
  {
    image: Ogre,
    label: '40-90'
  },

  {
    image: Hellhound,
    label: '40-90'
  },
  {
    image: Dagannoth,
    label: '40-90'
  },
  {
    image: Lesserdemon,
    label: '40-90'
  },
  {
    image: FireGiant,
    label: '40-90'
  },
  {
    image: Shade,
    label: '40-90'
  },
  {
    image: ShadeKourend,
    label: '40-90'
  },
  {
    image: Arrg,
    label: '40-90'
  },
  {
    image: Hobgoblin,
    label: '40-90'
  },
  {
    image: IceWarrior,
    label: '40-90'
  },
  {
    image: BlueDragon,
    label: '40-90'
  },
  {
    image: LesserDemon2,
    label: '40-90'
  },
  {
    image: KalphiteGuardian,
    label: '40-90'
  }
]

const monstersSecondary = [
  {
    image: Obor
  },
  {
    image: MossGiant2
  }
]
const router = useRouter()
</script>

<template>
  <header class="mobile:pb-1 bg-black pt-5 pb-2.5 flex justify-center overflow-hidden z-30 relative">
    <Logo class="mobile:hidden" />
    <Logo class="mobile:block hidden" :logoType="'secondary'" />
  </header>

  <Hero />

  <div class="mobile:mt-[-350px] mt-[-300px]">
    <Paper :height="isMobile ? 1000 : 1375" :startHeightProp="isMobile ? 480 : undefined"
      :endHeightProp="isMobile ? 600 : undefined">
      <h3 style="letter-spacing: 4px"
        class="mobile:text-[34px] mobile:mt-0 mobile:mb-8 mobile:px-0 mobile:leading-8 mobile:text-pretty text-[rgba(243,108,0,1)] mt-8 text-[48px] text-center mb-[40px] uppercase">
        Stats of Your Account
      </h3>
      <PaperItem :delay="1000" :title="'Stats:'" :titleClass="'mobile:!mb-2.5 !mb-2'" :showDivider="true">
        <div class="flex flex-col gap-y-5">
          <div class="flex w-full items-center justify-center gap-5">
            <Stat :delay="1200" :icon="HP" :label="'59 HitPoints'" />
            <Stat :delay="1300" :icon="strength" :label="'60 Strength'" />
            <div class="mobile:hidden">
              <Stat :delay="1400" :icon="defense" :label="'60 Defense'" />
            </div>
          </div>
          <div class="flex w-full items-center justify-center gap-5">
            <div class="mobile:block hidden">
              <Stat :delay="1400" :icon="defense" :label="'60 Defense'" />
            </div>
            <Stat :delay="1500" :icon="attack" :label="'60 Attack'" />
            <Stat :delay="1600" :icon="magic" :label="'19 Magic'" />
          </div>
          <div class="flex w-full items-center justify-center gap-5">
            <Stat :delay="1600" :icon="quests" :label="'32 Quest Points'" />
          </div>
        </div>
      </PaperItem>
      <PaperItem :delay="1000" :title="'GEAR:'" :titleClass="'!mb-3'" :showDivider="true">
        <img :src="gear" alt="Gear" class="mobile:h-[200px] mb-[15px]" />
      </PaperItem>
      <PaperItem :delay="1000" :title="'Account comes with 2M GOLD'" :titleClass="'mobile:!mb-1 !mb-2'">
                <div class="mobile:justify-around hidden mobile:flex mobile:gap-0 justify-center gap-[60px] w-full mr-8">
                  <img :src="coins" alt="coins" class="mobile:h-[120px] h-[100px]" />
                  <img :src="coins" alt="coins" class="mobile:h-[120px] h-[100px]" />
                </div>
        <Button @click="router.push('/sign-up')" :class="'mobile:scale-125'">Order Account</Button>
      </PaperItem>
    </Paper>
  </div>

  <!--  <div :style="{-->
  <!--    'background-image': `url(${isMobile ? killedBossBgMobile : killedBossBg})`-->
  <!--  }"-->
  <!--    class="bg-cover bg-no-repeat mt-[-50px] bg-center w-full mobile:h-[700px] h-[100vh] flex items-center justify-end">-->
  <!--    <div class="z-10 relative mx-auto mobile:py-12 mobile:px-[10px] max-w-[610px] text-center">-->
  <!--      <Divider :class="'mobile:mb-4 my-0 mb-10'" />-->
  <!--      <p style="-->
  <!--          letter-spacing: 2px;-->
  <!--        " class="golden-text mobile:text-[32px] mobile:leading-9 uppercase text-[48px]">-->
  <!--        Don’t Feel Like A Kid Again?-->
  <!--      </p>-->
  <!--      <p class="mobile:mt-5 mobile:text-[24px] mobile:mb-8 mt-11 mb-24 text-white text-[32px]">-->
  <!--        Cancel Trial In 7 Days And Don’t Pay A Penny-->
  <!--      </p>-->
  <!--      <Divider :class="'mobile:mb-4 my-0 mb-10'" />-->
  <!--      <p style="-->
  <!--          letter-spacing: 2px;-->
  <!--        " class="mobile:text-[32px] mobile:leading-[34px] golden-text uppercase text-[48px] leading-[50px]">-->
  <!--        Complete The Childhood Challenge-->
  <!--      </p>-->
  <!--      <img alt="coupon" :src="coupon" class="mobile:w-[270px] mobile:mt-5 mx-auto mt-10" />-->
  <!--      <div class="w-full mt-5 flex justify-center">-->
  <!--        <Button @click="router.push('/sign-up')">Get Free Account</Button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!-- <div class="mobile:mt-[-30px] mt-[-50px] max-w-[1100px] mx-auto relative z-20">
    <Paper
      :startHeightProp="isMobile ? 600 : 1000"
      :endHeightProp="isMobile ? 610 : 530"
      :height="isMobile ? 1200 : 1500"
      :paperEnd="paperEndSecondary">
      <div class="w-full px-4">
        <PaperItem :delay="1000" :title="'Reach 30 Slayer'" :titleClass="'mobile:!mb-2 !mb-0'">
          <h4 class="mobile:text-[16px] mobile:mb-0 text-[32px]">
            Kill <span class="text-[#704110]">X</span> Amount Of
            <span class="text-[#704110]">Monsters</span> To Reach 30 Slayer
          </h4>
          <Monsters :hasSlider="true" :monsters="monstersPrimary"
            :class="'mobile:!w-auto !w-[950px] justify-between'" />
        </PaperItem>
        <PaperItem :delay="1000" :tileClass="'mobile:!mb-4'" :title="'Slay Hill or Moss Giants Boss'" class="mt-8">
          <Monsters :monsters="monstersSecondary" class="!my-0 justify-center gap-[65px]" />
          <div class="w-full mt-5 flex justify-center">
            <Button @click="router.push('/sign-up')">Get Free Account</Button>
          </div>
        </PaperItem>
      </div>
    </Paper>
  </div> -->
  <footer
    class="mt-[-60px] mobile:h-[280px] h-[312px] mobile:items-end mobile:pb-10 bg-cover bg-no-repeat relative flex justify-center">
    <img :src="killedBossBg" class="absolute bottom-0 z-10 w-full h-[800px]" alt="B" />
    <div class="mt-[165px] z-30">
      <Logo />
    </div>
  </footer>
</template>

<style scope>
h3 {
  text-shadow: 1px 1px rgba(0, 0, 0, 1);
}
</style>
