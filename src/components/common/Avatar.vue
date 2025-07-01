<script lang="ts" setup>
const props = defineProps<{
  src: string;
  width?: string; // 例如 'w-14'
}>();
</script>

<template>
  <img
    :src="props.src"
    alt="avatar"
    :class="[width ?? 'w-14', width ?? 'h-14', 'rounded-full object-cover']"
  />
</template>
