"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { RouletteItem } from "../rouletteItems/rouletteItems";

type RouletteProps = {
  rouletteItems: RouletteItem[];
  onStop?: (stop: RouletteItem) => void;
};

const size = {
  x: 300,
  y: 300,
};
const radius = 100;

let degOffset = 0;
const initialAcceleration = 100;
let acceleration = initialAcceleration;
export const Roulette: FC<RouletteProps> = ({ rouletteItems, onStop }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const unitWeight = 360 / rouletteItems.length;
  const [result, setResult] = useState<string>();
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
    ctx.fillRect(0, 0, 100, 100);
    // ctxの保存
    ctx.save();

    canvas.width = size.x;
    canvas.height = size.y;
    const image = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < image.data.length; i++) {
      image.data[i] = 255;
    }
    ctx.putImageData(image, 0, 0);
    drawRoulette(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawPie(
    start_deg: number,
    end_deg: number,
    radius: number,
    color: string
  ) {
    let _start_deg = ((360 - start_deg) * Math.PI) / 180;
    let _end_deg = ((360 - end_deg) * Math.PI) / 180;
    const ctx = getContext();
    if (ctx === null || ctx === undefined) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(size.x / 2, size.y / 2);
    ctx.fillStyle = color; // 塗りつぶしの色は赤
    ctx.arc(size.x / 2, size.y / 2, radius, _start_deg, _end_deg, true);
    ctx.fill();

    showArrow();
  }
  function drawRoulette(offset: number) {
    let uwCount = offset;

    rouletteItems.forEach((e) => {
      drawPie(uwCount, uwCount + unitWeight, radius, e.color);
      uwCount += unitWeight;
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
    console.log(acceleration);
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
      console.log(currentDeg);
      const stopRouletteItem = rouletteItems.find((_, i) => {
        return currentDeg <= (i + 1) * unitWeight;
      });
      if (stopRouletteItem === undefined) {
        return;
      }
      setResult(stopRouletteItem.name);
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
      <div>{result}</div>
    </>
  );
};
