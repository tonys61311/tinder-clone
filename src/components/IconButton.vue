<script lang="ts" setup>
import type { FunctionalComponent } from 'vue';
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  icon: FunctionalComponent;
  buttonClass?: HTMLAttributes['class'];
  iconClass?: HTMLAttributes['class'];
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

</script>

<template>
  <button @click="emit('click')" :class="['flex items-center justify-center rounded p-0 m-0 border-0 hover:text-pink-500', buttonClass]">
    <component :is="props.icon" :class="['w-8 h-8', props.iconClass]" />
    <slot />
  </button>
</template>
