"use client";
import { useState } from "react";
import { Roulette } from "./components/Roulette";
import { RouletteItem, pointItems } from "./rouletteItems/rouletteItems";
import { Center, Heading, Text } from "@chakra-ui/react";
import { createRouletteItems } from "./rouletteItems/createRouletteItems";
export default function Home() {
  const [subject, setSubject] = useState("");
  const [predicate, setPredicate] = useState("");
  const [point, setPoint] = useState("");
  const [rouletteItems, setRouletteItems] = useState<RouletteItem[]>(
    createRouletteItems("SUBJECT", 0)
  );
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
        const newRouletteItems = createRouletteItems("PREDICATE", id);
        setRouletteItems(newRouletteItems);
      };
    }
    if (!point) {
      return () => {
        const newRouletteItems = pointItems;
        setRouletteItems(createRouletteItems("POINT", 0));
      };
    }
  })();
  const onReset = () => {
    setSubject("");
    setPredicate("");
    setPoint("");
    setRouletteItems(createRouletteItems("SUBJECT", 0));
  };
  return (
    <Center flexFlow={"column"}>
      <Heading>ルーレット</Heading>
      <Roulette
        rouletteItems={rouletteItems}
        onStop={onStop}
        onNext={onNext}
        onReset={onReset}
      />
      <Text fontSize={"3xl"}>
        {subject} {predicate} {point}
      </Text>
    </Center>
  );
}
