![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Host-000000?logo=vercel&style=for-the-badge&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?logo=supabase&style=for-the-badge&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/Shadcn-UI-black?style=for-the-badge)

# Memorization App

![](./src/マイページ画面.png)
***
このアプリは暗記アプリです。暗記したいものをマークダウンで書いて、今日覚える暗記が何かを教えてくれます。適切な復習時期を効率的に復習することができます※。React、Next.js、TypeScript、Supabase を使用し、認証機能・CRUDを実装しています。
<br />
※ エビングハウスの忘却曲線を採用

## デモページ

https://memorization-app-today.vercel.app

### デモ用認証情報
メールアドレス: testuser@gml.com
<br />
パスワード: testuser

## 機能一覧
- マイページ：登録した暗記カテゴリーを参照するページです
  - 暗記カテゴリー追加
  - 暗記カテゴリー選択
  - ログアウト
- 暗記アイテム学習ページ：選択した暗記カテゴリーに含まれる暗記アイテムを暗記するページです
  - 中断機能
  - 解答表示・非表示機能
  - 戻る機能
  - 明日もう一度見る機能
  - 覚えた機能
  - カテゴリー名変更機能
  - カテゴリー削除機能
- 暗記アイテム参照ページ：今まで登録した暗記アイテムを一覧で参照するページです
  - ソート機能・更新日毎
  - ソート機能・覚えた回数毎
  - 暗記アイテム編集機能
  - 暗記アイテム削除機能
  - 暗記アイテム作成機能
  - カテゴリー名変更機能
  - カテゴリー削除機能
- 暗記アイテム作成・編集ページ
  - マークダウンで作成・編集機能
  - 登録機能

## 技術一覧
### フロントエンド
- Next.js 14（App Router 使用）
- React 19
- Tailwind CSS（UI スタイリング）
- Shadcn/ui（UI コンポーネント）
- React Hook Form

### バックエンド
- Next.js API Routes
- Supabase（PostgreSQL）

### 認証
- Supabase（メール認証・Google認証）

### ホスト
- Vercel
  
### 型
- zod（スキーマバリデーション）
- TypeScript

### DB設計
- 参照
<br />
https://github.com/Faron-17/memorization-app/blob/main/doc/erd.md