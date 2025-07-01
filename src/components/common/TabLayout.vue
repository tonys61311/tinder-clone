<script lang="ts" setup>
import type { TabItem } from '@/types/tabItem';
import { ref, onMounted, nextTick, watch, computed } from 'vue';

const props = defineProps<{
  tabs: TabItem[];
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const underlineLeft = ref(0);
const underlineWidth = ref(0);
const tabRefs = ref<HTMLElement[]>([]);
const direction = ref<'left' | 'right'>('right');

const activeIndex = computed(() =>
  props.tabs.findIndex(tab => tab.key === props.modelValue)
);

onMounted(() => {
  nextTick(() => updateUnderline());
});

watch(() => props.modelValue, (newVal, oldVal) => {
  const oldIndex = props.tabs.findIndex(tab => tab.key === oldVal);
  const newIndex = props.tabs.findIndex(tab => tab.key === newVal);
  direction.value = newIndex > oldIndex ? 'right' : 'left';
});


function selectTab(tabKey: string) {
  emit('update:modelValue', tabKey);
  nextTick(() => updateUnderline());
}

function updateUnderline() {
  const index = props.tabs.findIndex(tab => tab.key === props.modelValue);
  const el = tabRefs.value[index];
  if (el) {
    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement!.getBoundingClientRect();
    underlineLeft.value = rect.left - parentRect.left;
    underlineWidth.value = rect.width;
  }
}

const getItemClass = (key: string) => {
  if (direction.value === 'right' && activeIndex.value === 0) {
    return 'transition-none';
  }

  if (key === props.modelValue) {
    return direction.value === 'right' ? 'translate-x-0 animate-slide-left' : 'translate-x-0 animate-slide-right';
  } else {
    return direction.value === 'right' ? 'animate-slide-left-out' : 'animate-slide-right-out';
  }
};

</script>

<template>
  <div class="h-full flex flex-col">
    
    <!-- Tab 切換列 -->
    <div class="relative flex border-b border-gray-700">
      <button
        v-for="(tab, index) in props.tabs"
        :key="tab.key"
        class="flex-1 py-3 text-center relative overflow-hidden rounded-none"
        @click="selectTab(tab.key)"
      >
        <span :class="props.modelValue === tab.key ? 'text-white font-bold' : 'text-gray-500'">
          {{ tab.label }}
        </span>
      </button>
      <!-- 底線動畫 -->
      <div
        class="absolute bottom-0 h-1 bg-pink-500 transition-all duration-300"
        :style="{
          width: `${100 / props.tabs.length}%`,
          left: `${activeIndex * 100 / props.tabs.length}%`
        }"
      ></div>
    </div>

    <!-- 下方內容區 -->
    <div class="flex-1 overflow-y-auto scrollbar-hide">
      <transition-group tag="div" class="relative h-full">
        <component
          v-for="tab in props.tabs"
          v-show="tab.key === props.modelValue"
          :key="tab.key"
          :is="tab.component"
          class="absolute inset-0 h-full transition-transform duration-300"
          :class="getItemClass(tab.key)"
        />
      </transition-group>

    </div>
  </div>
</template>
