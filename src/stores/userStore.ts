import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getRandomAvatar } from '@/utils/randomUtils';
import { RoutePath } from '@/router/route-names';
import { useRouter } from 'vue-router';

export interface UserItem {
  id: string;
  photos: string[];
  avatar: string;
  name: string;
  hasNewMessage?: boolean;
  isVerified?: boolean;
  messages?: { text: string; isSelf: boolean }[];
}


export const useUserStore = defineStore('userStore', () => {
  const users = ref<UserItem[]>([]);
  const activeTab = ref('match');
  const router = useRouter();

  function initUsers() {
    if (users.value.length > 0) return;
    
    const rawUsers = [
        { id: '1', 
          name: 'mkiiiiiii',
          photos: [getRandomAvatar(), getRandomAvatar(), getRandomAvatar()],
          messages: [
          { text: '🌷', isSelf: false },
          { text: 'hi', isSelf: true },
          { text: '🌷', isSelf: false },
          { text: '🌷', isSelf: true },
          { text: '🌷', isSelf: false },
          { text: '🌷', isSelf: true },
          { text: '🌷', isSelf: false },
          { text: '🌷', isSelf: true }
        ] },
        { id: '2', name: 'Bella', photos: [getRandomAvatar()], isVerified: true },
        { id: '3', photos: [getRandomAvatar()], name: '曾' },
        { id: '4', photos: [getRandomAvatar()], name: 'Ssu-Ting', isVerified: true },
        { id: '5', photos: [getRandomAvatar()], name: 'mkiiiiiii' },
        { id: '6', photos: [getRandomAvatar()], name: 'Bella', isVerified: true },
        { id: '7', photos: [getRandomAvatar()], name: '曾' },
        { id: '8', photos: [getRandomAvatar()], name: 'Ssu-Ting', isVerified: true },
        { id: '9', photos: [getRandomAvatar()], name: 'mkiiiiiii' },
        { id: '10', photos: [getRandomAvatar()], name: 'Bella', isVerified: true },
        { id: '11', photos: [getRandomAvatar()], name: '曾' },
        { id: '12', photos: [getRandomAvatar()], name: 'Ssu-Ting', isVerified: true },
      ];

      users.value = rawUsers.map(user => ({
        ...user,
        avatar: user.photos[0] || ''
      }));
  }

  const isMatchChatLayout = computed(() => {
    return router.currentRoute.value.path === RoutePath.MatchChatLayout;
  });

  function switchTab(tab: string) {
    activeTab.value = tab;
    if (!isMatchChatLayout.value) {
      router.push(RoutePath.MatchChatLayout);
    }
  }

  return {
    users,
    activeTab,
    isMatchChatLayout,
    initUsers,
    switchTab
  };
});
