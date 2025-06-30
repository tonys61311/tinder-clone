<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Avatar from '@/components/Avatar.vue';
import IconButton from '@/components/IconButton.vue';
import { getRandomAvatar } from '@/utils/randomUtils';
import { X, Smile } from 'lucide-vue-next';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import { RoutePath } from '@/router/route-names';

const avatarUrl = getRandomAvatar();
const messages = ref([
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
]);

const reversedMessages = computed(() => [...messages.value].reverse());

const input = ref('');
const props = defineProps<{ userId: string }>();
const router = useRouter();
const showEmoji = ref(false);

function goBack() {
  router.push(RoutePath.MatchChatLayout);
}

function handleEmojiSelect(e: { i: string }) {
  input.value += e.i;
  showEmoji.value = false;
}

const sendMessage = () => {
  if (input.value) {
   messages.value = [
    ...messages.value,
    { text: input.value, isSelf: true }
  ];
    input.value = '';
  }
}


const chatContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    setTimeout(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight - chatContainer.value.clientHeight;
      }
    }, 100);
  });
};

watch(messages, () => {
  scrollToBottom();
});
</script>

<template>
  <div class="flex flex-col h-full w-full bg-black relative">

    <!-- 關閉按鈕 -->
    <button
      @click="goBack"
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
          <Avatar :src="avatarUrl" width="w-10" />
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
    </div>


    <!-- 輸入區 -->
    <div class="border-t border-gray-700 p-4 flex items-center space-x-4">
      <input v-model="input" type="text" placeholder="輸入訊息" class="flex-1 bg-transparent text-white focus:outline-none" id="messageInput"
  name="message" />
      
      <div class="relative">
        <IconButton :icon="Smile" @click="showEmoji = !showEmoji" />
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
