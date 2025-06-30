<script lang="ts" setup>
import { ref } from 'vue';
import MatchCard from '@/components/MatchCard.vue';
import { getRandomAvatar } from '@/utils/randomUtils';

function getRandomPhotoUrls(): string[] {
    return [
        getRandomAvatar(),
        getRandomAvatar(),
        getRandomAvatar(),
        getRandomAvatar(),
    ];
}

const users = [
  { name: '小明', age: 26, photos: getRandomPhotoUrls() },
  { name: '小美', age: 24, photos: getRandomPhotoUrls() },
  { name: '阿強', age: 30, photos: getRandomPhotoUrls() },
  { name: '阿花', age: 28, photos: getRandomPhotoUrls() },
];

const currentIndex = ref(0);
const isAnimating = ref(false);
const slideDirection = ref<'left' | 'right'>('right');

const handleAction = (like: boolean) => {
    console.log(like ? '喜歡' : '不喜歡', users[currentIndex.value].name);
    
  if (isAnimating.value || currentIndex.value >= users.length) return;

  slideDirection.value = like ? 'right' : 'left';
  isAnimating.value = true;

  setTimeout(() => {
    currentIndex.value++;
    isAnimating.value = false;
  }, 300); // 動畫時間
};
</script>

<template>
  <div class="relative flex justify-center items-center w-full h-full">

    <div
    v-for="(user, index) in users.slice(currentIndex, currentIndex + 2).reverse()"
    :key="user.name"
    class="absolute w-full transition-transform duration-300"
    :class="[
        index === 0 ? 'translate-x-2 translate-y-2' : '',
        index === 1 && isAnimating ? (slideDirection === 'right' ? 'animate-slide-right-out' : 'animate-slide-left-out') : ''
    ]"
        >
        <MatchCard v-bind="user" @like="handleAction(true)" @dislike="handleAction(false)" />
    </div>


  </div>
</template>
