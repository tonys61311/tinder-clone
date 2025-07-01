<script lang="ts" setup>
import { ref, computed } from 'vue';
import { MatchCard } from '@/components';
import { useUserStore } from '@/stores/userStore';

const store = useUserStore();
const recommendedUsers = computed(() => store.recommendedUsers);

const currentIndex = ref(0);
const isAnimating = ref(false);
const slideDirection = ref<'left' | 'right'>('right');
const showTWoCards = computed(() => recommendedUsers.value.slice(currentIndex.value, currentIndex.value + 2).reverse());

const handleAction = (like: boolean, userId: string) => {
  if (isAnimating.value || currentIndex.value >= recommendedUsers.value.length) return;

  slideDirection.value = like ? 'right' : 'left';
  isAnimating.value = true;

  if (like) store.addToMatchedUsers(userId);

  setTimeout(() => {
    currentIndex.value++;
    isAnimating.value = false;

    // 如果剩兩張卡片，則在呼叫 loadRecommendedUsers 新增卡片
    if (currentIndex.value + 2 >= recommendedUsers.value.length) {
      store.loadRecommendedUsers();
    }
  }, 300);
};
</script>

<template>
  <div class="relative flex justify-center items-center w-full h-full">

    <div
      v-for="(user, index) in showTWoCards"
      :key="user.id"
      class="absolute w-full transition-transform duration-300"
      :class="[
        index === 0 ? 'translate-x-2 translate-y-2' : '',
        index === 1 && isAnimating ? (slideDirection === 'right' ? 'animate-slide-right-out' : 'animate-slide-left-out') : ''
      ]"
    >
      <MatchCard v-bind="user" @like="handleAction(true, user.id)" @dislike="handleAction(false, user.id)" />
    </div>

  </div>
</template>
