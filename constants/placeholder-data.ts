const categories = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Next',
    count: 3,
    pin: true,
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: '基本情報',
    count: 12,
    pin: true,
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'AWS',
    count: 9,
    pin: false,
  },
];


const items = [
  {
    id: '',
    category_id: '',
    title: "JavaScript において、内部関数が外部関数の変数を参照し続ける仕組みを何という？",
    answer: "クロージャ（Closure）",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  },
  {
    id: '',
    category_id: '',
    title: "アルゴリズムの時間計算量や空間計算量を表す記法は？",
    answer: "Big-O 記法",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  },
  {
    id: '',
    category_id: '',
    title: "「オブジェクトの状態を変更せず、新しいオブジェクトを生成する設計思想」を何という？",
    answer: "イミュータブル（Immutable）",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  },
  {
    id: '',
    category_id: '',
    title: "REST API と SOAP API の主な違いは？",
    answer: "REST は軽量で HTTP メソッドを活用するが、SOAP は XML ベースでより厳密なプロトコルを持つ。",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  },
  {
    id: '',
    category_id: '',
    title: "JavaScript で非同期処理を扱う 3 つの方法は？",
    answer: "コールバック、Promise、async/await",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  },
  {
    id: '',
    category_id: '',
    title: "SOLID 原則の 5 つの要素は？",
    answer: "単一責任（S）、開放閉鎖（O）、リスコフの置換（L）、インターフェース分離（I）、依存性逆転（D）",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  },
  {
    id: '',
    category_id: '',
    title: "メモリ管理において、不要になったオブジェクトを自動的に解放する仕組みを何という？",
    answer: "ガベージコレクション（Garbage Collection）",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  },
  {
    id: '',
    category_id: '',
    title: "SQL でテーブルを結合する 4つの主要な JOIN の種類は？",
    answer: "INNER JOIN、LEFT JOIN、RIGHT JOIN、FULL JOIN",
    created_at: new Date,
    updated_at: new Date,
    count: 0,
  }
]


export { categories, items }