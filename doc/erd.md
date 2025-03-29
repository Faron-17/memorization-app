# ER図

## Memorization App データベース

```mermaid
---
title: "ユーザーアカウント"
---
erDiagram
  USERS ||--o{ MEMO_CATEGORIES : ""
  MEMO_CATEGORIES ||--o{ MEMO_ITEMS : ""

  USERS {
    uuid id PK "ID"
    varchar username "ユーザー名"
    string password "パスワード"
    string email "メールアドレス"
  }

  MEMO_CATEGORIES {
    uuid id PK "ID"
    uuid user_id FK "User ID:USERS.id"
    string name "カテゴリー名"
    boolean pin "Navにピン留め"
  }

  MEMO_ITEMS {
    uuid id PK "ID"
    uuid category_id FK "Memo Category ID:MEMO_CATEGORIES.id"
    string title "タイトル"
    string answer "解答"
    timestamp created_at "作成日時"
    timestamp updated_at "更新日時"
    number count "回数"
  }
```

## 補足
- 画面各所に出すバッジ数値は、DBでは持たない。今日の日付とupdated_at、countを比較して、バッジ数値として加算されたりされなかったりする。countは3以上の場合は比較対象にならない。count=1, count=2, count=3は何日後に加算対象となるか、などといった設定ファイルをコードで持つ想定
- USERS DB：メールアドレスとOAuth認証（google）