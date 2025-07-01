# Tinder Clone

## 程式設計概述

本專案為使用 **Vite + Vue 3 + TypeScript + Pinia** 開發的配對與聊天網頁應用，模擬 Tinder 風格的互動體驗。前端使用 **Tailwind CSS** 打造響應式 UI，適應各種裝置尺寸。應用提供使用者配對推薦、查看配對名單、以及即時聊天功能。

系統透過本地 **mockData** JSON 檔案模擬推薦用戶、配對用戶與聊天資料，並透過自訂的 **fetch API** 讀取假資料，模擬實際後端資料流。整體專案支援 **GitHub Pages** 靜態部署，方便快速展示與測試。

## GitHub Pages 展示

[Demo](https://tonys61311.github.io/tinder-clone)

## 專案結構

```
public/                          # 公開靜態資源資料夾
├── mockData/                    # 模擬資料
│   ├── matchedUsers.json        # 模擬配對用戶資料
│   ├── recommendedUsers.json    # 模擬推薦用戶資料
└── vite.svg                     # 預設 Vite 圖示

src/                              # 應用主要程式碼
├── api/                          # 處理 API 請求
│   └── userDataApi.ts            # 用戶資料相關 API
├── assets/                       # 靜態資源（樣式、圖片）
├── components/                   # UI 元件模組
│   ├── chat/                     # 聊天功能元件
│   │   ├── MessageContent.vue    # 聊天訊息內容
│   │   └── MessageList.vue       # 聊天訊息列表
│   ├── common/                   # 通用元件（頭像、按鈕、載入畫面等）
│   │   ├── Avatar.vue            # 使用者頭像元件
│   │   ├── ErrorScreen.vue       # 錯誤畫面元件，顯示錯誤提示資訊
│   │   ├── IconButton.vue        # 圖示按鈕元件，結合 icon 與點擊功能
│   │   ├── LoadingView.vue       # 載入畫面元件，顯示資料加載中狀態
│   │   ├── MobileTabBar.vue      # 手機版底部切換選單
│   │   └── TabLayout.vue         # 通用分頁切換元件
│   └── match/                    # 配對功能元件
│       ├── MatchCard.vue         # 單一配對卡片
│       ├── MatchCardList.vue     # 配對卡片列表
│       └── MatchedList.vue       # 已配對用戶列表
├── composables/                  # 自訂 Composition API 邏輯
│   └── useNavigation.ts          # 導覽邏輯封裝
├── router/                       # 路由設定
│   ├── index.js
│   └── route-names.ts
├── stores/                       # 狀態管理（Pinia）
│   ├── apiStore.ts               # API 請求狀態管理
│   └── userStore.ts              # 使用者資料與狀態管理
├── types/                        # TypeScript 類型定義
│   ├── tabItem.ts
│   └── user.ts
├── utils/                        # 工具函式
│   ├── apiRequestHandler.ts      # API 請求處理器，封裝 fetch 請求與錯誤處理
│   ├── baseApi.ts                # 基礎 API 類別，提供通用的 fetch 方法
│   └── randomUtils.ts
├── views/                        # 畫面頁面元件
│   ├── HomeView.vue              # 首頁
│   ├── LoginView.vue             # 登入頁
│   └── MatchChatView.vue         # 聊天頁
├── App.vue                       # 應用主組件
└── index.ts                      # 程式進入點

./                                 # 專案根目錄
├── .env                           # 環境變數設定檔
├── .gitignore                     # Git 忽略檔案清單
├── env.d.ts                       # 環境變數型別定義
├── index.html                     # 應用入口 HTML
├── main.js                        # 主要程式進入點（Vite 預設）
├── package.json                   # 專案依賴與指令設定
├── package-lock.json              # 鎖定依賴版本
├── postcss.config.js              # PostCSS 設定
├── README.md                      # 專案說明文件
├── tailwind.config.ts             # Tailwind 設定
├── tsconfig.json                  # TypeScript 主設定檔
├── tsconfig.node.json             # Node.js 專用設定
└── vite.config.ts                 # Vite 打包與開發伺服器設定
```

### 核心技術與架構

- **Vue 3 + Vite**：前端開發框架與打包工具
- **TypeScript**：靜態型別強化，提升開發穩定性與可維護性
- **Pinia**：狀態管理（用戶資料、配對名單、聊天訊息等）
- **Tailwind CSS**：CSS 框架，快速打造響應式、現代化 UI
- **GitHub Pages**：靜態網站部署，方便快速展示與測試


### 程式邏輯與核心功能

#### 1. 狀態管理 (Pinia)

##### userStore.ts
管理使用者相關資料，包括目前登入狀態、配對名單、聊天訊息紀錄與推薦用戶列表。快速取得配對用戶、聊天紀錄等資訊，並協助不同頁面之間資料共享與同步。

##### apiStore.ts
通用的 loading 狀態管理器，負責處理資料請求時的 loading 效果與錯誤提示顯示，確保畫面能即時反映 API 請求狀態，提升使用者體驗。

#### 2. 功能首頁 (MatchChatView.vue)

畫面分為左右兩個區塊，左側為列表區(配對列表, 訊息列表)、右側為主要內容區(配對卡片預覽, 聊天對話內容)。

---

### 左側區塊（列表區）

透過 `TabLayout.vue` 切換顯示不同列表：

##### MatchedList.vue（配對列表）

負責顯示使用者的配對名單，資料來源為 Pinia 的 `userStore` 狀態。每個配對項目包含頭像、名稱、是否驗證、最新訊息等資訊。使用者點擊某位配對對象時，右側畫面會切換至聊天介面，並載入對應聊天紀錄。

##### MessageList.vue（訊息列表）

顯示所有已有聊天紀錄的對象列表，包含對方頭像、名稱、最後一則訊息預覽與未讀提示。使用者點擊某則訊息後，右側畫面會切換至對應的聊天內容。

---

### 右側區塊（主要內容區）

預設顯示：

##### MatchCardList.vue（配對卡片列表）

配對卡片介面，使用者選擇喜好（like/dislike）來進行配對，模擬實際的配對操作。

若使用者在左側點擊：

- **配對列表項目**
- **訊息列表項目**

則右側畫面會切換至：

##### MessageContent.vue（聊天內容）

顯示與指定對象的聊天紀錄，支援即時訊息輸入、送出與自動捲動至最新訊息，模擬即時聊天互動效果。

---

### 小螢幕尺寸適配

針對手機與小螢幕裝置，畫面將自動切換為單區塊模式，避免左右兩區同時顯示造成擁擠：

- 點擊配對或訊息時，畫面會切換至配對卡片畫面或聊天列表。

---

#### 3. 封裝 Api (包含錯誤處理以及 loading 狀態管理)
在 **utils/apiRequestHandler.ts** 中封裝了 API 請求邏輯，提供統一的錯誤處理與 loading 狀態管理。當發送請求時觸發 apiStore 控制 loading 與錯誤提示。此方法呼叫 BaseApi 類別整合，用以建立可重用的 API 請求邏輯，方便各模組擴充使用。

## 安裝

1. Clone this repository:
   ```bash
   git clone https://github.com/tonys61311/tinder-clone.git
   ```

2. Navigate into the project directory：
   ```bash
   cd tinder-clone
   ```

3. Install dependencies：
   ```bash
   npm install
   ```

4. Start the local development server：
   ```bash
   npm run dev
   ```