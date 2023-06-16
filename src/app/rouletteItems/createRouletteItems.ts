import {
  OriginalRouletteItem,
  RouletteItem,
  pointItems,
  predicateItem,
  subjectItem,
} from "./rouletteItems";
const colors = [
  "#CEFFBE",
  "#FFCE11",
  "#FF22BE",
  "#777EBE",
  "#FF33BE",
  "#FFCEAA",
];
export const createRouletteItems = (
  phase: "SUBJECT" | "PREDICATE" | "POINT",
  id: number
): RouletteItem[] => {
  if (phase === "SUBJECT") {
    const newSubjectItems = arrayShuffle([...subjectItem]).slice(
      0,
      Math.min(4, subjectItem.length)
    );
    const rouletteItems: RouletteItem[] = newSubjectItems.map((item, i) => {
      return {
        ...item,
        color: colors[i],
      };
    });
    return rouletteItems;
  }

  if (phase === "POINT") {
    const newPointItems = arrayShuffle([...pointItems]).slice(
      0,
      Math.min(4, pointItems.length)
    );
    const rouletteItems: RouletteItem[] = newPointItems.map((item, i) => {
      return {
        ...item,
        color: colors[i],
      };
    });
    return rouletteItems;
  }
  const newPredicateItems = arrayShuffle([...predicateItem[id]]).slice(
    0,
    Math.min(4, predicateItem[id].length)
  );
  const rouletteItems: RouletteItem[] = newPredicateItems.map((item, i) => {
    return {
      ...item,
      color: colors[i],
    };
  });
  return rouletteItems;
};

function arrayShuffle(array: OriginalRouletteItem[]) {
  for (let i = array.length - 1; 0 < i; i--) {
    // 0〜(i+1)の範囲で値を取得
    let r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    let tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
