<script lang="ts" setup>
import { onMounted } from 'vue';
import TabLayout from '@/components/TabLayout.vue';
import type { TabItem } from '@/components/TabLayout.vue';
import MatchedList from '@/components/MatchedList.vue';
import MessageList from '@/components/MessageList.vue';
import MobileTabBar from '@/components/MobileTabBar.vue';
import { Heart, MessageSquare } from 'lucide-vue-next';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';


const userStore = useUserStore();

onMounted(() => {
  userStore.initUsers();
});

const tabs: TabItem[] = [
  { key: 'match', label: '配對', component: MatchedList },
  { key: 'chat', label: '聊天', component: MessageList }
];

const { activeTab, isMatchChatLayout } = storeToRefs(userStore);

</script>

<template>
  <div class="flex h-full bg-black">

    <!-- 左側列表 -->
    <div class="flex-[3] h-full w-[400px] bg-gray-900 text-white hidden md:block">

      <!-- TabLayout 區，自適應剩餘高度 -->
      <TabLayout :tabs="tabs" v-model="activeTab" />
      
    </div>

    <!-- 右側內容 -->
    <div class="flex-[7] flex flex-col h-full">
      
      <!-- 內容區 -->
      <div class="flex-1 overflow-hidden">
        <!-- 其餘畫面 -->
        <div class="h-full w-full" :class="{ 'hidden md:block': activeTab === 'chat' && isMatchChatLayout }">
          <router-view :key="$route.path" />
        </div>

        <!-- 手機專屬 MessageList -->
        <div 
          class="h-full w-full md:hidden overflow-y-auto scrollbar-hide" 
          v-if="activeTab === 'chat' && isMatchChatLayout"
        >
          <MessageList />
        </div>
      </div>
    

      <!-- 手機底部功能列 -->
      <div class="md:hidden">
    
        <MobileTabBar
          v-model="activeTab"
          :items="[
            { icon: Heart, key: 'match' },
            { icon: MessageSquare, key: 'chat' }
          ]"
          @click="userStore.switchTab"
        />


      </div>
    </div>
  </div>
</template>
