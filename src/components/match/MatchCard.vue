<script lang="ts" setup>
import { ref } from 'vue';
import { IconButton } from '@/components';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps<{
  name: string; 
  age: number; 
  photos: string[];
}>();

const emit = defineEmits<{
  (e: 'like'): void;
  (e: 'dislike'): void;
}>();
const currentIndex = ref(0);
const direction = ref<'left' | 'right'>('right');

const nextImage = () => {
  if (currentIndex.value < props.photos.length - 1) {
    direction.value = 'right';
    currentIndex.value++;
  }
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    direction.value = 'left';
    currentIndex.value--;
  }
};

</script>

<template>
  <div class="flex items-center justify-center h-full">

    <!-- 卡片區 -->
    <div class="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden">

      <!-- 圖片區，使用 transition-group 疊圖 -->
      <transition-group tag="div">
       <img
          v-for="(photo, index) in photos"
          v-show="index === currentIndex"
          :key="photo"
          :src="photo"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
          :class="[direction === 'right' && currentIndex === 0 && 'transition-none', 
            index === currentIndex
            ? direction === 'right' ? 'translate-x-0 animate-slide-left' : 'translate-x-0 animate-slide-right'
            : direction === 'right' ? 'animate-slide-left-out' : 'animate-slide-right-out']"
        />
      </transition-group>

      <!-- 漸層遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <!-- 上方圖片指示條 -->
      <div class="absolute top-4 left-4 right-4 flex space-x-1">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="flex-1 h-1 rounded transition-all duration-300"
          :class="currentIndex === index ? 'bg-white' : 'bg-white/30'"
        ></div>
      </div>


      <!-- 左右箭頭 -->
      <button @click="prevImage" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
        <ChevronLeft class="w-4 h-4" />
      </button>
      <button @click="nextImage" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full">
        <ChevronRight class="w-4 h-4" />
      </button>

      <!-- 名字年齡 -->
      <div class="absolute bottom-20 left-4 text-white text-xl font-bold">
        {{ name }}, {{ age }}
      </div>

      <!-- 按鈕區 -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-6">
        <IconButton :icon="X" @click="emit('dislike')" buttonClass="bg-gray-800 text-white p-3 rounded-full" />
        <IconButton :icon="Heart" @click="emit('like')" buttonClass="bg-pink-600 text-white p-3 rounded-full" />
      </div>
    </div>

  </div>
</template>

<style scoped>
.aspect-\[3\/4\] {
  aspect-ratio: 3/4;
}

</style>
