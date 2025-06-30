<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full mb-4 px-4 py-2 border rounded"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full mb-4 px-4 py-2 border rounded"
      />
      <button
        class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        @click="handleLogin"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RoutePath } from '@/router/route-names';

const email = ref('')
const password = ref('')
const router = useRouter()

function handleLogin() {
  // 簡單模擬登入
  if (email.value && password.value) {
    router.push(RoutePath.Home)
  } else {
    alert('Please enter email and password.')
  }
}
</script>
