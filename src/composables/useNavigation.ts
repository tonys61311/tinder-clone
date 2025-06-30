import { useRouter } from 'vue-router';
import { RouteName } from '@/router/route-names';

export function useNavigation() {
  const router = useRouter();

  function goChat(userId: string) {
    router.push({
      name: RouteName.MessageContent,
      params: { userId },
    });
  }

  return {
    goChat,
  };
}