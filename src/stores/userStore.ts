import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/user';
import { userDataApi } from '@/api/userDataApi'

export const useUserStore = defineStore('userStore', () => {
  // 已配對用戶列表
  const matchedUsers = ref<User[]>([]);
  // 推薦用戶列表
  const recommendedUsers = ref<User[]>([]);

  /**
   * 依照 userId 取得已配對用戶資料
   */
  function getUserById(id: string): User {
    return matchedUsers.value.find(user => user.id === id)!;
  }

  /**
   * 新增訊息並更新對應用戶的 timestamp
   */
  function addMessageAndUpdateTimestamp(userId: string, text: string, isSelf: boolean) {
    const user = matchedUsers.value.find(u => u.id === userId);
    if (user) {
      if (!user.messages) {
        user.messages = [];
      }
      user.messages.push({ text, isSelf });
      user.timestamp = Date.now();
      user.hasNewMessage = !isSelf; // 收到對方訊息才標記新訊息
    }
  }

  /**
   * 將推薦用戶移至已配對用戶列表，並加上 timestamp
   */
  function addToMatchedUsers(userId: string) {
    const index = recommendedUsers.value.findIndex(user => user.id === userId);
    if (index === -1) return;

    const user = recommendedUsers.value[index];

    matchedUsers.value.unshift({
      ...user,
      messages: [],
      timestamp: Date.now(),
    });
  }

  /**
   * 依照 timestamp 將已配對用戶排序（最新在上）
   */
  const sortedUserList = computed(() => {
    return [...matchedUsers.value].sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
  });
  
  async function loadMatchedUsers (): Promise<void> {
    const jsonObj = await userDataApi.loadMatchedUsers()
    if (jsonObj) {
      console.log('Loaded MatchedUsers:', jsonObj)
      matchedUsers.value = jsonObj.map(user => ({
        ...user,
        avatar: user.photos[0] || ''
      }));
    }
  }

  async function loadRecommendedUsers(): Promise<void> {
    const jsonObj = await userDataApi.loadRecommendedUsers()
    if (jsonObj) {
      console.log('Loaded RecommendedUsers:', jsonObj)
      
      recommendedUsers.value.push(
        ...jsonObj.map(user => ({
          ...user,
          avatar: user.photos[0] || ''
        }))
      );
    }
  }

  return {
    matchedUsers,
    recommendedUsers,
    sortedUserList,
    getUserById,
    addMessageAndUpdateTimestamp,
    addToMatchedUsers,
    loadMatchedUsers,
    loadRecommendedUsers,
  };
});
