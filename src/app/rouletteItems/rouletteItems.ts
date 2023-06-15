export type RouletteItem = {
  id: number;
  name: string;
  color: string;
};

export const subjectItem: RouletteItem[] = [
  {
    id: 1,
    name: "名前に",
    color: "#FFCEBE",
  },
  {
    id: 2,
    name: "今の服装に",
    color: "#CEFFBE",
  },
  {
    id: 3,
    name: "label3",
    color: "#CEBEFF",
  },
  {
    id: 4,
    name: "label4",
    color: "#FDED9E",
  },
];
// children: [
//   {
//     name: "「た」が入っている",
//     color: "#FFCEBE",
//   },
//   {
//     name: "「か」が入っている",
//     color: "#CEFFBE",
//   },
// ],
// children: [
//   {
//     name: "「赤」が入っている",
//     color: "#FFCEBE",
//   },
//   {
//     name: "「白」が入っている",
//     color: "#CEFFBE",
//   },
// ],
export const predicateItem: { [key: number]: RouletteItem[] } = {
  1: [
    {
      id: 1,
      name: "「た」が入っている",
      color: "#FFCEBE",
    },
    {
      id: 2,
      name: "「か」が入っている",
      color: "#CEFFBE",
    },
  ],
  2: [
    {
      id: 1,
      name: "「赤」が入っている",
      color: "#FFCEBE",
    },
    {
      id: 2,
      name: "「白」が入っている",
      color: "#CEFFBE",
    },
  ],
  3: [
    {
      id: 1,
      name: "「た」が入っている",
      color: "#FFCEBE",
    },
    {
      id: 2,
      name: "「か」が入っている",
      color: "#CEFFBE",
    },
  ],
  4: [
    {
      id: 1,
      name: "「た」が入っている",
      color: "#FFCEBE",
    },
    {
      id: 2,
      name: "「か」が入っている",
      color: "#CEFFBE",
    },
  ],
};
export const pointItems = [
  {
    id: 1,
    name: "0点",
    color: "#CEBEFF",
  },
  {
    id: 2,
    name: "1点",
    color: "#CEBEFF",
  },
  {
    id: 3,
    name: "2点",
    color: "#FDED9E",
  },
  {
    id: 4,
    name: "3点",
    color: "#FDED9E",
  },
];
