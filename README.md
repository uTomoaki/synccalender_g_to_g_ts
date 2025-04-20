# synccalender_g_to_g_ts

カレンダー情報を Garoon から Google カレンダーに同期するアプリケーション

## 使い方

1. `.env.local`を作成
2. `.env.example`の内容を`.env.local`にコピー
3. `docker compose up -d`を実行
4. `http://localhost:3000/api/sync`にアクセス

## フォルダ構成

```
my-sync-app/
├── .env.example              ── 環境変数のサンプル
├── next.config.ts            ── Next.js 設定
├── tsconfig.json             ── TypeScript 設定
├── package.json
└── src/
    ├── app/                  ── Next.js 13 の app ディレクトリ
    │   └── api/
    │       └── sync/         ── エンドポイント「/api/sync」
    │           └── route.ts  ── API Route Handler。A→B の呼び出しを orchestration
    │
    ├── config/               ── 環境変数読み込み・設定
    │   └── index.ts
    │
    ├── lib/                  ── 外部 API とのやり取り（クライアント実装）
    │   ├── apiClientA.ts     ── GET 用クライアント（API A）
    │   └── apiClientB.ts     ── POST 用クライアント（API B）
    │
    ├── services/             ── ビジネスロジック層／Orchestration
    │   └── syncService.ts    ── A から受け取ったデータを B に送るロジック
    │
    ├── types/                ── DTO／型定義
    │   ├── apiA.ts           ── API A のレスポンス型定義
    │   └── apiB.ts           ── API B のリクエスト・レスポンス型定義
    │
    ├── utils/                ── 汎用ユーティリティ
    │   └── logger.ts         ── ロガー (console まわり)
    │
    └── tests/                ── ユニットテスト
        ├── services/
        │   └── syncService.test.ts
        └── lib/
            └── apiClientA.test.ts
```
