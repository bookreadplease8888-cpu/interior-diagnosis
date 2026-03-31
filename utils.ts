export const STYLE_MAP = {
  brooklyn: {
    label: "王道ブルックリン",
    subtitle: "無骨×カフェ感で作る、男前だけど居心地のいい空間",
    metaDescription:
      "ブルックリン系インテリアに合う家具と雑貨を予算内で提案。診断結果からおすすめセットまでまとめてチェックできます。",
    analysis:
      "深い色、金属感、木の質感を好む傾向が強く、生活感を抑えて世界観を作り込みたいタイプです。",
    ngPoints: ["木・黒・アイアン以外の素材が混ざりすぎる", "照明だけが明るすぎて浮く", "収納のテイストがばらける"],
    oneShot: "まずは照明をエジソン球やブラック系に変えると一気に雰囲気がまとまります。",
    scoreLabel: "センス高め・映え強め",
  },
  nordic: {
    label: "北欧タイプ",
    subtitle: "木と白で作る、やさしく整った暮らし空間",
    metaDescription:
      "北欧スタイルに合う家具と雑貨を予算に合わせて提案。部屋タイプ診断結果から今すぐ揃えやすいアイテムを紹介します。",
    analysis:
      "明るい色と木の素材を好み、落ち着きと清潔感を重視する回答が多いため北欧系との相性が高いです。",
    ngPoints: ["色数が多い", "木の色味がバラバラ", "ラグやカーテンだけ強すぎる柄"],
    oneShot: "ラグかローテーブルを木×白の定番配色に寄せると北欧感が出しやすいです。",
    scoreLabel: "好感度高め・居心地重視",
  },
  korean: {
    label: "韓国風タイプ",
    subtitle: "淡色で統一する、抜け感のある癒し空間",
    metaDescription:
      "韓国風インテリアに合う淡色家具・雑貨を提案。診断結果に合わせて予算内セットも表示します。",
    analysis:
      "柔らかい色味や丸みのあるデザインを好み、写真映えと統一感を大切にするタイプです。",
    ngPoints: ["黒が多すぎる", "木の赤みが強い", "収納アイテムだけ生活感が出る"],
    oneShot: "ファブリックの色をアイボリー〜ベージュにそろえると一気に韓国風に寄ります。",
    scoreLabel: "かわいさ強め・統一感重視",
  },
  hotel: {
    label: "ホテルライクタイプ",
    subtitle: "白黒と間接照明で作る、洗練された高級空間",
    metaDescription:
      "ホテルライクな部屋づくりに合う家具・照明・雑貨を提案。診断結果と予算に合わせてまとまりのあるセットを表示します。",
    analysis:
      "生活感を消したい気持ちが強く、モノトーンや整然さを重視する回答が多いです。",
    ngPoints: ["収納が見える", "素材感がチープ", "色が増えすぎる"],
    oneShot: "照明を間接照明に変えるだけでホテル感が一番出しやすいです。",
    scoreLabel: "大人っぽさ高め・清潔感重視",
  },
  japandi: {
    label: "ジャパンディタイプ",
    subtitle: "和の静けさと北欧のぬくもりを混ぜた余白のある空間",
    metaDescription:
      "ジャパンディインテリアに合う家具と雑貨を提案。和と北欧を両立する部屋づくりを診断結果からサポートします。",
    analysis:
      "落ち着いた余白、自然素材、長く使える家具を重視する回答が目立ちます。",
    ngPoints: ["装飾が多すぎる", "ツヤ感が強い", "色のコントラストが強すぎる"],
    oneShot: "まずはラグか収納を自然素材寄りにすると世界観がまとまりやすいです。",
    scoreLabel: "上質感高め・静けさ重視",
  },
} as const;

export type StyleKey = keyof typeof STYLE_MAP;

export const FURNITURE_CATEGORIES = [
  "table",
  "sofa",
  "lighting",
  "rug",
  "storage",
  "bed",
  "desk",
  "decor",
] as const;

export const COLOR_OPTIONS = ["white", "black", "gray", "beige", "brown", "wood", "green", "blue"] as const;

export const QUIZ_QUESTIONS = [
  { id: "brightness", title: "明るい部屋と暗めの部屋、どちらが好き？", options: [
      { label: "明るめが好き", scores: { nordic: 2, korean: 2, japandi: 1 } },
      { label: "少し落ち着いた方が好き", scores: { hotel: 2, brooklyn: 1, japandi: 2 } },
      { label: "暗めでムード重視", scores: { brooklyn: 2, hotel: 2 } },
    ] },
  { id: "material", title: "好きな素材は？", options: [
      { label: "木・ファブリック", scores: { nordic: 2, japandi: 2, korean: 1 } },
      { label: "アイアン・レザー", scores: { brooklyn: 2, hotel: 1 } },
      { label: "ガラス・大理石風", scores: { hotel: 2, korean: 1 } },
    ] },
  { id: "style", title: "服の系統に近いのは？", options: [
      { label: "ナチュラル・シンプル", scores: { nordic: 2, japandi: 2 } },
      { label: "モノトーン・キレイめ", scores: { hotel: 2, korean: 1 } },
      { label: "ヴィンテージ・無骨", scores: { brooklyn: 2 } },
    ] },
  { id: "life", title: "生活感はどれくらい消したい？", options: [
      { label: "かなり消したい", scores: { hotel: 2, brooklyn: 1 } },
      { label: "少し整えばOK", scores: { nordic: 2, korean: 1, japandi: 1 } },
      { label: "暮らし感があってもいい", scores: { japandi: 2, brooklyn: 1 } },
    ] },
  { id: "mood", title: "部屋で一番大事にしたいのは？", options: [
      { label: "癒し", scores: { nordic: 2, korean: 2, japandi: 2 } },
      { label: "高級感", scores: { hotel: 2 } },
      { label: "かっこよさ", scores: { brooklyn: 2, hotel: 1 } },
    ] },
  { id: "shape", title: "好きな家具の形は？", options: [
      { label: "丸みがある", scores: { korean: 2, nordic: 1 } },
      { label: "直線的でシャープ", scores: { hotel: 2, brooklyn: 1 } },
      { label: "低めで落ち着いた形", scores: { japandi: 2, nordic: 1 } },
    ] },
  { id: "accent", title: "差し色は入れたい？", options: [
      { label: "ほぼ入れたくない", scores: { hotel: 2, japandi: 1 } },
      { label: "少しだけなら", scores: { nordic: 2, brooklyn: 1, korean: 1 } },
      { label: "やわらかい色を入れたい", scores: { korean: 2, nordic: 1 } },
    ] },
  { id: "usage", title: "部屋の使い方に近いのは？", options: [
      { label: "くつろぎ最優先", scores: { nordic: 2, japandi: 2 } },
      { label: "作業も集中もしたい", scores: { hotel: 2, brooklyn: 1 } },
      { label: "写真映えや見た目を重視", scores: { korean: 2, hotel: 1, brooklyn: 1 } },
    ] },
  { id: "floorMatch", title: "床や壁と合わせたいのは？", options: [
      { label: "明るくなじませたい", scores: { nordic: 2, korean: 1, japandi: 1 } },
      { label: "コントラストをつけたい", scores: { brooklyn: 2, hotel: 2 } },
      { label: "自然に溶け込ませたい", scores: { japandi: 2, nordic: 1 } },
    ] },
  { id: "attention", title: "人にどう思われたい？", options: [
      { label: "センスいいと思われたい", scores: { brooklyn: 2, hotel: 1, korean: 1 } },
      { label: "居心地いいと思われたい", scores: { nordic: 2, japandi: 2 } },
      { label: "おしゃれで可愛いと思われたい", scores: { korean: 2 } },
    ] },
] as const;
