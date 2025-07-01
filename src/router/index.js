import { createRouter, createWebHistory } from 'vue-router';
import { RouteName, RoutePath } from './route-names';

const routes = [
  {
    path: RoutePath.Home,
    name: RouteName.Home,
    redirect: RoutePath.MatchChatLayout
  },
  {
    path: RoutePath.MatchChatLayout,
    name: RouteName.MatchChatLayout,
    component: () => import('@/views/MatchChatView.vue'),
    children: [
      {
        path: '',
        name: RouteName.MatchContent,
        component: () => import('@/components/match/MatchCardList.vue')
      },
      {
        path: 'chat/:userId',
        name: RouteName.MessageContent,
        component: () => import('@/components/chat/MessageContent.vue'),
        props: true
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes
})

export default router
