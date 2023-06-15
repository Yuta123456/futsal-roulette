"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { RouletteItem } from "../rouletteItems/rouletteItems";

type RouletteProps = {
  rouletteItems: RouletteItem[];
  onStop?: (stop: RouletteItem) => void;
  onNext?: (id: number) => void;
};

const size = {
  x: 375,
  y: 375,
};
const radius = 100;

let degOffset = 0;
const initialAcceleration = 100;
let acceleration = initialAcceleration;
export const Roulette: FC<RouletteProps> = ({
  rouletteItems,
  onStop,
  onNext,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const unitWeight = 360 / rouletteItems.length;
  const [result, setResult] = useState<RouletteItem>();
  const [isMoving, setIsMoving] = useState(false);
  const [isStopping, setIsStopping] = useState(true);
  const [rouletteTimer, setRouletteTimer] = useState<NodeJS.Timer>();

  const getContext = (): CanvasRenderingContext2D | undefined | null => {
    const canvas = canvasRef.current;

    return canvas?.getContext("2d");
  };
  useEffect(() => {
    const ctx = getContext();
    if (ctx === undefined || ctx === null) {
      return;
    }
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }

    canvas.width = size.x;
    canvas.height = size.y;
    const image = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < image.data.length; i++) {
      image.data[i] = 255;
    }
    ctx.putImageData(image, 0, 0);
    drawRoulette(degOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rouletteItems]);

  function drawPie(
    start_deg: number,
    end_deg: number,
    radius: number,
    color: string,
    text: string
  ) {
    let _start_deg = ((360 - start_deg) * Math.PI) / 180;
    let _end_deg = ((360 - end_deg) * Math.PI) / 180;
    console.log(_start_deg, _end_deg, text);
    const ctx = getContext();
    if (ctx === null || ctx === undefined) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(size.x / 2, size.y / 2);
    ctx.fillStyle = color;
    ctx.arc(size.x / 2, size.y / 2, radius, _start_deg, _end_deg, true);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "13px Roboto medium";
    const textCenter = (_start_deg + _end_deg) / 2;
    const textX = size.x / 2 + (radius / 2) * Math.cos(textCenter);
    const textY = size.y / 2 + (radius / 2) * Math.sin(textCenter);
    ctx.fillText(text, textX - text.length * 6, textY + 10);

    showArrow();
  }
  function drawRoulette(offset: number) {
    console.log(offset % 360);
    const ctx = getContext();
    if (ctx === null || ctx === undefined) {
      return;
    }
    ctx.clearRect(0, 0, size.x, size.y);
    let uwCount = offset;

    rouletteItems.forEach((e) => {
      drawPie(uwCount, uwCount + unitWeight, radius, e.color, e.name);

      uwCount -= unitWeight;
    });
  }
  function showArrow() {
    const ctx = getContext();
    if (ctx === null || ctx === undefined) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(size.x / 2, size.y / 2 - radius);
    ctx.lineTo(size.x / 2 + 10, size.y / 2 - radius - 10);
    ctx.lineTo(size.x / 2 - 10, size.y / 2 - radius - 10);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "rgba(40,40,40)";
    ctx.fill();
  }

  function runRoulette() {
    const timer = setInterval(() => {
      degOffset += acceleration;
      drawRoulette(degOffset);
    }, 10);
    setRouletteTimer(timer);
  }
  const stopRoulette = () => {
    const a = Math.ceil(Math.random() * 100) + 1000;
    let cnt = 1;
    const timer = setInterval(() => {
      drawRoulette(degOffset);
      cnt++;
      const newAcceleration = a / cnt - 10;
      acceleration = Math.min(newAcceleration, initialAcceleration);
      degOffset += acceleration;
      if (acceleration > 0) {
        return;
      }
      clearInterval(timer);
      acceleration = initialAcceleration;
      const currentDeg = Math.ceil(degOffset % 360);
      const stopRouletteItem = rouletteItems.find((_, i) => {
        return currentDeg <= (i + 1) * unitWeight;
      });
      if (stopRouletteItem === undefined) {
        return;
      }
      setResult(stopRouletteItem);
      console.log(rouletteItems, stopRouletteItem, currentDeg, unitWeight);
      onStop && onStop(stopRouletteItem);
      setIsMoving(false);
    }, 10);
  };
  if (canvasRef === null || canvasRef === undefined) {
    return;
  }
  return (
    <>
      <canvas className="canvas" ref={canvasRef} />
      <Button
        onClick={() => {
          runRoulette();
          setIsMoving(true);
          setIsStopping(false);
        }}
        isDisabled={isMoving || !onStop}
      >
        start
      </Button>
      <Button
        onClick={() => {
          clearInterval(rouletteTimer);
          stopRoulette();
          setIsStopping(true);
        }}
        isDisabled={isStopping || !onStop}
      >
        stop
      </Button>
      <Button
        onClick={() => {
          if (result && onNext) {
            onNext(result.id);
          }
        }}
        isDisabled={isStopping || isMoving || !onStop || !onNext}
      >
        next
      </Button>
    </>
  );
};
