"use client";
import { useState } from "react";
import { Roulette } from "../components/Roulette";
import {
  RouletteItem,
  pointItems,
  predicateItem,
  subjectItem,
} from "../rouletteItems/rouletteItems";
import { Button, Text } from "@chakra-ui/react";
export default function Home() {
  const [subject, setSubject] = useState("");
  const [predicate, setPredicate] = useState("");
  const [point, setPoint] = useState("");
  const [rouletteItems, setRouletteItems] =
    useState<RouletteItem[]>(subjectItem);
  const onSetSubject = (newSubject: RouletteItem) => {
    setSubject(newSubject.name);
  };
  const onSetPredicate = (newPredicate: RouletteItem) => {
    setPredicate(newPredicate.name);
  };
  const onSetPoint = (newPoint: RouletteItem) => {
    setPoint(newPoint.name);
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
  const onNext = (() => {
    if (!predicate) {
      return (id: number) => {
        const newRouletteItems = predicateItem[id];
        setRouletteItems(newRouletteItems);
      };
    }
    if (!point) {
      return (id: number) => {
        const newRouletteItems = pointItems;
        setRouletteItems(newRouletteItems);
      };
    }
  })();
  const onReset = () => {
    setSubject("");
    setPredicate("");
    setPoint("");
    setRouletteItems(subjectItem);
  };
  return (
    <main>
      <Roulette
        rouletteItems={rouletteItems}
        onStop={onStop}
        onNext={onNext}
        onReset={onReset}
      />
      <Text>
        {subject} {predicate} {point}
      </Text>
    </main>
  );
}
