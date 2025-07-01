import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getRandomAvatar } from '@/utils/randomUtils';
import type { User } from '@/types/user';
import { userDataApi } from '@/api/userDataApi'

export const useUserStore = defineStore('userStore', () => {
  // 已配對用戶列表
  const matchedUsers = ref<User[]>([]);
  // 推薦用戶列表
  const recommendedUsers = ref<User[]>([]);

  /**
   * 初始化已配對用戶資料
   */
  function initMatchedUsers() {
    if (matchedUsers.value.length > 0) return;
    
    const rawUsers = [
        { 
          id: '1', 
          name: 'mkiiiiiii',
          age: 25,
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
          ] 
        },
        { 
          id: '2', 
          name: 'Bella', 
          age: 27,
          photos: [getRandomAvatar()], 
          isVerified: true, 
          messages: [
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
          ]
        },
        { id: '3', name: '曾', age: 24, photos: [getRandomAvatar()] },
        { id: '4', name: 'Ssu-Ting', age: 26, photos: [getRandomAvatar()], isVerified: true },
        { id: '5', name: 'mkiiiiiii', age: 25, photos: [getRandomAvatar()] },
        { id: '6', name: 'Bella', age: 27, photos: [getRandomAvatar()], isVerified: true },
        { id: '7', name: '曾', age: 24, photos: [getRandomAvatar()] },
        { id: '8', name: 'Ssu-Ting', age: 26, photos: [getRandomAvatar()], isVerified: true },
        { id: '9', name: 'mkiiiiiii', age: 25, photos: [getRandomAvatar()] },
        { id: '10', name: 'Bella', age: 27, photos: [getRandomAvatar()], isVerified: true },
        { id: '11', name: '曾', age: 24, photos: [getRandomAvatar()] },
        { id: '12', name: 'Ssu-Ting', age: 26, photos: [getRandomAvatar()], isVerified: true },
      ];


      matchedUsers.value = rawUsers.map(user => ({
        ...user,
        avatar: user.photos[0] || '',
        messages: user.messages ?? [],
        timestamp: Date.now(),
      }));
  }

  /**
   * 初始化推薦用戶資料
   */
  function initRecommendedUsers() {
    if (recommendedUsers.value.length > 0) return;

    const rawRecommended = [
      { id: '13', name: '曾', age: 24, photos: [getRandomAvatar()] },
      { id: '14', name: 'Ssu-Ting', age: 26, photos: [getRandomAvatar()], isVerified: true },
      { id: '15', name: 'mkiiiiiii', age: 25, photos: [getRandomAvatar()] },
      { id: '16', name: 'Bella', age: 27, photos: [getRandomAvatar()], isVerified: true },
    ];

    recommendedUsers.value = rawRecommended.map(user => ({
      ...user,
      avatar: user.photos[0] || '',
      messages: [],
    }));
  }

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
