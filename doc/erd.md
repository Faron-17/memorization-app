# ER図

## Memorization App データベース

```mermaid
---
title: "ユーザーアカウント"
---
erDiagram
  USERS ||--o{ CATEGORIES : ""
  CATEGORIES ||--o{ ITEMS : ""

  USERS {
    uuid id PK "ID"
    varchar username "ユーザー名"
    string password "パスワード"
    string email "メールアドレス"
    timestamp created_at "作成日時"
    timestamp updated_at "更新日時"
  }

  CATEGORIES {
    uuid id PK "ID"
    uuid user_id FK "User ID:USERS.id"
    string name "カテゴリー名, not null"
    boolean pin "サイドバーにピン留め"
    timestamp created_at "作成日時"
    timestamp updated_at "更新日時"
  }

  ITEMS {
    uuid id PK "ID"
    uuid category_id FK "Category ID:CATEGORIES.id"
    string title "タイトル, not null"
    string answer "解答, not null"
    number count "回数"
    timestamp created_at "作成日時"
    timestamp updated_at "更新日時"
    timestamp memorized_at "暗記日時"
  }
```

## 補足
- 画面各所に出すバッジ数値は、アプリを開いた日にその日は何個暗記するものがあるかの合計を通知する
- バッジ数値のカウント方法は、暗記項目一つ一つに対し、ITEMSのcountとmemorized_atを用いて、アプリを開いた当該日時に暗記するべきか否かを計算する
- 例）countが1、memorized_atが昨日→今日は暗記すべき→バッジ数値に加算
- 例）countが2、memorized_atが昨日→今日は暗記すべきでない→バッジ数値に加算しない
- 今回はcount3までを計算対象とし、4からは加算対象としない
- count=nに対し、何日後に暗記対象かの計算は設定ファイルをコード上に持つ