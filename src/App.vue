<template>
  <div class="flex flex-col h-screen font-sans">

    <!-- Main -->
    <main class="h-full">
      <LoadingView />
      <ErrorScreen />
      <router-view v-show="!apiStore.error" />
    </main>

  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useApiStore } from '@/stores/apiStore'
import LoadingView from '@/components/common/LoadingView.vue'
import ErrorScreen from '@/components/common/ErrorScreen.vue'
import { apiRequest } from '@/utils/apiRequestHandler'

const { loadMatchedUsers, loadRecommendedUsers } = useUserStore();
const apiStore = useApiStore();

onMounted(async () => {
  await loadMatchedUsers();
  await loadRecommendedUsers();
});
</script>
