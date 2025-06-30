import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getRandomAvatar } from '@/utils/randomUtils';
export interface UserItem {
  id: string;
  photos: string[];
  avatar: string;
  name: string;
  messages: { text: string; isSelf: boolean }[];
  timestamp: number;
  hasNewMessage?: boolean;
  isVerified?: boolean;
}


export const useUserStore = defineStore('userStore', () => {
  const users = ref<UserItem[]>([]);

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
        { id: '2', name: 'Bella', photos: [getRandomAvatar()], isVerified: true, messages: [
          { text: '嗨', isSelf: false },
          { text: 'Hi', isSelf: true },
          { text: '下班了嗎', isSelf: true },
          { text: '現在剛下班', isSelf: false },
          { text: '有空嗎？', isSelf: false },
          { text: '有空啊，你呢？', isSelf: true },
          { text: '我也有空', isSelf: false },
          { text: '那我們聊聊天吧', isSelf: true }, 
          { text: '好啊', isSelf: false },
          { text: '你喜歡什麼音樂？', isSelf: true },
          { text: '我喜歡搖滾樂，你呢？', isSelf: false },
          { text: '我也喜歡搖滾樂！', isSelf: true },
          { text: '那我們有共同的興趣了！', isSelf: false }
        ]},
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
        avatar: user.photos[0] || '',
        messages: user.messages ?? [],
        timestamp: Date.now(),
      }));
  }

  function getUserById(id: string): UserItem {
    return users.value.find(user => user.id === id)!;
  }

  function addMessageAndUpdateTimestamp(userId: string, text: string, isSelf: boolean) {
    const user = users.value.find(u => u.id === userId);
    if (user) {
      if (!user.messages) {
        user.messages = [];
      }
      user.messages.push({ text, isSelf });
      user.timestamp = Date.now();
      user.hasNewMessage = !isSelf; // 假設收到對方訊息才標記新訊息
    }
  }

  const sortedUserList = computed(() => {
    return [...users.value].sort((a, b) => b.timestamp - a.timestamp);
  });
  

  return {
    users,
    sortedUserList,
    initUsers,
    getUserById,
    addMessageAndUpdateTimestamp,
  };
});
