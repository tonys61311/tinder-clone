// api/transcriptApi.ts
import type { User } from '@/types/user'
import { BaseApi } from '@/utils/baseApi'

class UserDataApi extends BaseApi {
  constructor() {
    super('/mockData') // 設定基礎路徑
  }

  async loadMatchedUsers() {
    return this.get<User[]>('/matchedUsers.json')
  }

  async loadRecommendedUsers() {
    return this.get<User[]>('/recommendedUsers.json')
  }
}

export const userDataApi = new UserDataApi()
