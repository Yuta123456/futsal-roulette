"use client";
import { useState } from "react";
import { Roulette } from "../components/Roulette";
import {
  RouletteItem,
  pointItems,
  predicateItem,
  subjectItem,
} from "../rouletteItems/rouletteItems";
import { Text } from "@chakra-ui/react";
export default function Home() {
  const [subject, setSubject] = useState("");
  const [predicate, setPredicate] = useState("");
  const [point, setPoint] = useState("");
  const [rouletteItems, setRouletteItems] =
    useState<RouletteItem[]>(subjectItem);
  const onSetSubject = (newSubject: RouletteItem) => {
    setSubject(newSubject.name);
    const newRouletteItems = predicateItem[newSubject.id];
    setRouletteItems(newRouletteItems);
  };
  const onSetPredicate = (newPredicate: RouletteItem) => {
    setPredicate(newPredicate.name);
    const newRouletteItems = pointItems;
    setRouletteItems(newRouletteItems);
  };
  const onSetPoint = (newPoint: RouletteItem) => {
    setPoint(newPoint.name);
    setRouletteItems([]);
  };
  const onStop = (() => {
    if (!subject) {
      return onSetSubject;
    }
    if (!predicate) {
      return onSetPredicate;
    }
    if (!point) {
      return onSetPoint;
    }
  })();
  return (
    <main>
      <Roulette rouletteItems={rouletteItems} onStop={onStop} />
      <Text>
        {subject} {predicate} {point}
      </Text>
    </main>
  );
}
