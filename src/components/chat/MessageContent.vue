<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { Avatar, IconButton } from '@/components';
import { X, Smile } from 'lucide-vue-next';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import { useNavigation } from '@/composables/useNavigation';
import { useUserStore } from '@/stores/userStore';

// 聊天輸入框綁定的資料
const input = ref('');

// 接收父層傳入的 userId
const props = defineProps<{ userId: string }>();

// 控制表情選單顯示
const showEmoji = ref(false);

// 自定義導航方法
const { goMatches } = useNavigation();

// 取得全局的用戶資料 store
const store = useUserStore();

// 根據傳入的 userId 取得對應用戶資料
const user = store.getUserById(props.userId);

// 計算屬性：將訊息反轉，最新訊息顯示在下方
const reversedMessages = computed(() => [...user.messages].reverse());

// 選擇表情符號後，將表情加入輸入框，並關閉表情選單
function handleEmojiSelect(e: { i: string }) {
  input.value += e.i;
  showEmoji.value = false;
}

// 傳送訊息，並將輸入框清空
const sendMessage = () => {
  if (input.value) {
    store.addMessageAndUpdateTimestamp(props.userId, input.value, true); // true 代表自己發送
    input.value = '';
  }
}

// 聊天視窗容器，用來滾動到底部
const chatContainer = ref<HTMLElement | null>(null);

// 捲動聊天視窗到底部
const scrollToBottom = () => {
  nextTick(() => {
    setTimeout(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
      }
    }, 100); // 稍微延遲，避免渲染時機問題
  });
};

// 監聽訊息變化，每次有新訊息就捲動到底部
watch(user.messages, () => {
  scrollToBottom();
});
</script>

<template>
  <div class="flex flex-col h-full w-full bg-black relative">

    <!-- 關閉按鈕 -->
    <button
      @click="goMatches"
      class="absolute top-2 right-2 text-white hover:text-red-500 p-1"
    >
      <X class="w-6 h-6" />
    </button>

    <!-- 訊息內容區 -->
    <div ref="chatContainer" class="flex flex-col-reverse overflow-y-auto h-full scrollbar-hide p-4">
      <!-- 若高度還沒撐滿，則用此空白區域撐滿 -->
      <div class="flex-1" />

      <div
        v-for="(msg, index) in reversedMessages"
        :key="index"
        :class="[
          'flex items-start space-x-2 p-2',
          msg.isSelf ? 'justify-end' : 'justify-start'
        ]"
      >
        <!-- 對方訊息 -->
        <template v-if="!msg.isSelf">
          <Avatar :src="user.avatar" width="w-10" />
          <div class="bg-gray-800 text-white px-3 py-1 rounded-xl max-w-[70%] rounded-bl-md">
            {{ msg.text }}
          </div>
        </template>

        <!-- 自己訊息 -->
        <template v-else>
          <div class="bg-blue-500 text-white px-3 py-1 rounded-xl max-w-[70%] rounded-br-md">
            {{ msg.text }}
          </div>
        </template>
      </div>

      <!-- 好友提示，固定在最上方，水平置中 -->
      <div class="w-full flex justify-center mb-4">
        <div class="text-gray-400 text-sm">
          您與 {{ user.name }} 已成為好友
        </div>
      </div>
    </div>


    <!-- 輸入區 -->
    <div class="border-t border-gray-700 p-4 flex items-center space-x-4">
      <input 
        v-model="input" 
        type="text" 
        placeholder="輸入訊息" 
        class="flex-1 bg-transparent text-white focus:outline-none" 
        id="messageInput"
        name="message" 
        @keydown.enter="sendMessage"
      />
      
      <div class="relative">
        <IconButton :icon="Smile" @click="showEmoji = !showEmoji" buttonClass="bg-transparent" />
        <EmojiPicker
          v-if="showEmoji"
          theme="dark"
          @select="handleEmojiSelect"
          class="absolute bottom-full right-0 mb-2"
        />
      </div>
      
      <button
        :disabled="!input"
        @click="sendMessage"
        :class="{
          'text-white px-3 py-1 rounded disabled:cursor-not-allowed': true,
          'bg-gradient-to-r from-[#FE2B75] to-[#FE4754]': input,
          'bg-gray-700': !input
        }"
      >
        傳送
      </button>
    </div>
  </div>
</template>
