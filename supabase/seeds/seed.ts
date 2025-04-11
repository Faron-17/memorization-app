import { createSeedClient } from '@snaplet/seed'

const itemData = [[
  { title: "最初にユネスコの世界遺産に登録された12の遺産は？", answer: `1. ガラパゴス諸島（エクアドル）
2. キトの市街（エクアドル）
3. アーヘン大聖堂（ドイツ）
4. ランス・オ・メドー国定史跡（カナダ）
5. シミエン国立公園（エチオピア）
6. ラリベラの岩窟教会群（エチオピア）
7. ナハニ国立公園（カナダ）
8. ゴレ島（セネガル）
9. メサ・ヴェルデ（アメリカ）
10. イエローストーン国立公園（アメリカ）：
11. クラクフ歴史地区（ポーランド）
12. ヴィエリチカ岩塩坑（ポーランド）

※ ガラパゴス諸島
![](https://cdn.adventure-life.com/10/34/39/Pinnacle_Rock_in_Bartolome/1300x820.webp)`, created_at: new Date, updated_at: new Date, memorized_at: null },
  { title: "世界遺産「富士山」の登録年はいつでしょうか？", answer: `解答　2007年
***
富士山は、2007年に「富士山-信仰の対象と芸術の源泉」として、ユネスコの世界文化遺産に登録されました。
![](https://upload.wikimedia.org/wikipedia/commons/f/f8/View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg)`, created_at: new Date, updated_at: new Date, memorized_at: null },
  { title: "世界遺産「アユタヤ歴史公園」はどの国にあるか", answer: `タイ
***
- アユタヤ歴史公園はタイ王国の古都で、現在もその壮大な遺跡が残っている
- 1991年にユネスコの世界遺産に登録された
- アユタヤ王朝は、東南アジアにおける重要な王国であり、その影響力は現在のタイをはじめとする周辺地域に多大な影響を与えた。`, created_at: new Date, updated_at: new Date, memorized_at: null },
  { title: "世界遺産「モン・サン＝ミシェル」はフランスのどこにあるか", answer: `解答 ノルマンディ
***
- モン・サン＝ミシェルはフランスのノルマンディ地方に位置しており、その壮大な修道院と独特な島の形態が特徴
- 1995年にユネスコの世界遺産に登録され、フランスを代表する観光名所となっている
- 特に干満の差が大きいため、昼と夜で全く違った顔を見せ、訪れるたびに新たな発見がある場所`, created_at: new Date, updated_at: new Date, memorized_at: null },
  ],[
    { title:'デジタル署名に用いる鍵の組み合わせは何か', answer: `- 送信者の秘密鍵で署名して、送信者の公開鍵で署名データを検証
- メッセージが改竄されていないこと、署名を作成したのが本人であることを確かめる技術
![](https://www.jipdec.or.jp/project/research/why-e-signature/isp54l00000007na-img/isp54l00000007qo.gif)`, created_at: new Date, updated_at: new Date, memorized_at: null}
  ],[
    { title: ' 労働基準法に基づき、労働契約が成立する際に使用者が労働者に交付しなければならない書面として適切なものは何か。', answer: '労働条件通知書：労働基準法第15条により、使用者は労働契約を締結する際に、労働者に労働条件通知書を交付することが義務付けられています。これにより、労働者は就業条件を明確に認識し、確認できるようになります。', created_at: new Date, updated_at: new Date, memorized_at: null }
  ]
];

const categoryData = [
  {
    user_id: '6a3eac49-fa6d-446e-9030-ba66cba5f4a4',
    name: '世界遺産検定1級',
    pin: true,
    created_at: new Date,
    updated_at: new Date,
    items: (x) => x(4).map((_, i) => itemData[0][i]),
  },
  {
    user_id: '6a3eac49-fa6d-446e-9030-ba66cba5f4a4',
    name: '応用情報技術者試験',
    pin: true,
    created_at: new Date,
    updated_at: new Date,
    items: (x) => x(1).map((_, i) => itemData[1][i]),
  },
  {
    user_id: '6a3eac49-fa6d-446e-9030-ba66cba5f4a4',
    name: '社会保険労務士',
    pin: false,
    created_at: new Date,
    updated_at: new Date,
    items: (x) => x(1).map((_, i) => itemData[2][i]),
  },
]

async function main() {
  const seed = await createSeedClient({ dryRun: true })

  await seed.categories(categoryData)

  process.exit()
}

main()

