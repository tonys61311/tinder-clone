<script lang="ts" setup>
import IconButton from '@/components/IconButton.vue';
import type { FunctionalComponent } from 'vue';

const props = defineProps<{
  modelValue: string;
  items: {
    icon: FunctionalComponent;
    key: string;
  }[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'click', key: string): void;
}>();

function handleClick(itemKey: string) {
  emit('update:modelValue', itemKey);
  emit('click', itemKey);
}
</script>

<template>
  <div class="flex justify-around items-center h-16 bg-gray-900 border-t border-gray-700">
    
    <IconButton
      v-for="item in items"
      :key="item.key"
      :icon="item.icon"
      @click="handleClick(item.key)"
      :buttonClass="[
        'p-2 rounded-full transition',
        modelValue === item.key ? 'text-blue-500' : ''
      ].join(' ')"
    />

  </div>
</template>
