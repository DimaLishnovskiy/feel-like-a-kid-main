import MessengerImage from '@/assets/images/Facebook Messenger.png';
import InstaImage from '@/assets/images/Instagram.png';
import WhatsAppImage from '@/assets/images/WhatsApp.png';
import ScheduleCallImage from '@/assets/images/NPC_Contact 1.png';

export const contactUsOptions = [
  {
    title: 'Messenger',
    image: MessengerImage,
    link: 'https://m.me/gamingtheballhardsway?ref=w26367461'
  },
  {
    title: 'Instagram',
    image: InstaImage,
    link: 'https://www.instagram.com/direct/t/100861361416684',
    disabled: false
  },
  {
    title: 'WhatsApp',
    image: WhatsAppImage,
    link: '',
    disabled: true
  },
  {
    title: 'Schedule a Call',
    image: ScheduleCallImage,
    link: 'https://calendly.com/ballhardsden',
    disabled: false,
  },
]
