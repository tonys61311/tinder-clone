<script lang="ts" setup>
import { Star } from 'lucide-vue-next';
import Avatar from '@/components/Avatar.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useNavigation } from '@/composables/useNavigation';

const userStore = useUserStore();
const { goChat } = useNavigation();
const route = useRoute();
const activeUserId = computed(() => route.params.userId);

</script>

<template>
  <div class="p-4 space-y-2">
    <div
      v-for="user in userStore.users"
      :key="user.name"
      class="flex items-center space-x-4 cursor-pointer hover:bg-gray-800 p-2 rounded"
      :class="{ 'bg-gray-700': activeUserId === user.id }"
      @click="goChat(user.id)"
    >
      <Avatar :src="user.avatar" />

      <div class="flex-1">
        <div class="flex items-center space-x-1">
          <span class="text-white font-bold">{{ user.name }}</span>
          <Star v-if="user.isVerified" class="w-4 h-4 text-blue-500 fill-blue-500" :stroke-width="1.5" />
        </div>

        <p v-if="user.messages?.length" class="text-gray-400 text-sm truncate">
          {{ user.messages[user.messages.length - 1].text }}
        </p>

      </div>
    </div>
  </div>
</template>
