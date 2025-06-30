<script lang="ts" setup>
import { useUserStore } from '@/stores/userStore';
import { useNavigation } from '@/composables/useNavigation';

const userStore = useUserStore();
const { goChat } = useNavigation();
</script>

<template>
    <div>
        <div class="p-2 grid gap-4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))] justify-items-center items-start">
            <div v-for="user in userStore.users" :key="user.id" @click="goChat(user.id)"
                class="relative w-full aspect-[3/4] rounded bg-gray-700 cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <img :src="user.avatar" alt="avatar"
                    class="w-full h-full object-cover rounded transition-opacity duration-300 hover:opacity-80" />

                <div
                    class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 text-white text-sm font-semibold rounded">
                    {{ user.name }}
                </div>

                <div v-if="user.hasNewMessage" class="absolute top-1 right-1 w-3 h-3 bg-pink-500 rounded-full"></div>
            </div>

        </div>
    </div>
</template>
