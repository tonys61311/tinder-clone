import { useRouter } from 'vue-router';
import { RouteName, RoutePath } from '@/router/route-names';

export function useNavigation() {
  const router = useRouter();

  function goChat(userId: string) {
    router.push({
      name: RouteName.MessageContent,
      params: { userId },
    });
  }

  function goMatches() {
    router.push(RoutePath.MatchChatLayout);
  }

  return {
    goChat,
    goMatches,
  };
}