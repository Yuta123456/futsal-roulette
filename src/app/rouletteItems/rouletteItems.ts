export type RouletteItem = {
  id: number;
  name: string;
  color: string;
};
export type OriginalRouletteItem = {
  id: number;
  name: string;
};
export const subjectItem: OriginalRouletteItem[] = [
  {
    id: 1,
    name: "名前に",
  },
  {
    id: 2,
    name: "今の服装に",
  },
  {
    id: 3,
    name: "彼女が",
  },
  {
    id: 4,
    name: "今週の進捗が",
  },
  {
    id: 5,
    name: "一杯目が",
  },
  {
    id: 6,
    name: "高校の時の部活が",
  },
];

export const predicateItem: { [key: number]: OriginalRouletteItem[] } = {
  // 名前に
  1: [
    {
      id: 1,
      name: "「た行」が入っている",
    },
    {
      id: 2,
      name: "「か行」が入っている",
    },
    {
      id: 3,
      name: "「さ行」が入っている",
    },
    {
      id: 4,
      name: "「あ行」が入っている",
    },
    {
      id: 5,
      name: "「な行」が入っている",
    },
    {
      id: 6,
      name: "「は行」が入っている",
    },
    {
      id: 7,
      name: "「ま行」が入っている",
    },
    {
      id: 8,
      name: "「や行」が入っている",
    },
  ],
  // 今の服装に
  2: [
    {
      id: 1,
      name: "「赤」が入っている",
    },
    {
      id: 2,
      name: "「白」が入っている",
    },
    {
      id: 3,
      name: "「黄色」が入っている",
    },
    {
      id: 4,
      name: "「オレンジ」が入っている",
    },
    {
      id: 5,
      name: "「黒」が入っている",
    },
  ],
  // 彼女が
  3: [
    {
      id: 1,
      name: "いる人",
    },
    {
      id: 2,
      name: "いない人",
    },
  ],
  // 今週の進捗が
  4: [
    {
      id: 1,
      name: "ある人",
    },
    {
      id: 2,
      name: "ない人",
    },
  ],
  // 一杯目が
  5: [
    {
      id: 1,
      name: "ビールの人",
    },
    {
      id: 2,
      name: "ハイボールの人",
    },
    {
      id: 3,
      name: "それ以外",
    },
  ],
  // 高校の時の部活が
  6: [
    {
      id: 1,
      name: "野球部の人",
    },
    {
      id: 2,
      name: "テニス部の人",
    },
    {
      id: 3,
      name: "帰宅部の人",
    },
    {
      id: 4,
      name: "それ以外の人",
    },
  ],
};
export const pointItems: OriginalRouletteItem[] = [
  {
    id: 1,
    name: "0点",
  },
  {
    id: 2,
    name: "2点",
  },
  {
    id: 3,
    name: "2点",
  },
  {
    id: 4,
    name: "2点",
  },
  {
    id: 5,
    name: "3点",
  },
  {
    id: 6,
    name: "3点",
  },
  {
    id: 7,
    name: "3点",
  },
  {
    id: 8,
    name: "4点",
  },
  {
    id: 9,
    name: "5点",
  },
];
