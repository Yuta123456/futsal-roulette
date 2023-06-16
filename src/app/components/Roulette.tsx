"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Button, Center, Container } from "@chakra-ui/react";
import { RouletteItem } from "../rouletteItems/rouletteItems";

type RouletteProps = {
  rouletteItems: RouletteItem[];
  onStop?: (stop: RouletteItem) => void;
  onNext?: (id: number) => void;
  onReset: () => void;
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
  onReset,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const unitWeight = 360 / rouletteItems.length;
  const [result, setResult] = useState<RouletteItem>();
  const [canClickButton, setCanClickButton] = useState("START");
  const [isStopping, setIsStopping] = useState(false);
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

  function drawRainbowPie(
    start_deg: number,
    end_deg: number,
    radius: number,
    color: string,
    text: string
  ) {
    const ctx = getContext();
    if (ctx === undefined || ctx === null) {
      return;
    }
    const gradient = ctx.createLinearGradient(0, 0, size.x, 0);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.17, "orange");
    gradient.addColorStop(0.33, "yellow");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(0.67, "blue");
    gradient.addColorStop(0.83, "indigo");
    gradient.addColorStop(1, "violet");
    // ctx.strokeStyle = gradient;
    drawPie(start_deg, end_deg, radius, gradient, text);
    const gradient2 = ctx.createLinearGradient(0, 0, 0, size.y);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.17, "orange");
    gradient.addColorStop(0.33, "yellow");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(0.67, "blue");
    gradient.addColorStop(0.83, "indigo");
    gradient.addColorStop(1, "violet");
    drawPie(start_deg, end_deg, radius, gradient2, text);
  }
  function drawPie(
    start_deg: number,
    end_deg: number,
    radius: number,
    color: string | CanvasGradient,
    text: string
  ) {
    let _start_deg = toRadian(start_deg);
    let _end_deg = toRadian(end_deg);
    const ctx = getContext();
    if (ctx === null || ctx === undefined) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(size.x / 2, size.y / 2);
    ctx.fillStyle = color;
    ctx.arc(size.x / 2, size.y / 2, radius, _start_deg, _end_deg);
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
    const ctx = getContext();
    if (ctx === null || ctx === undefined) {
      return;
    }
    ctx.clearRect(0, 0, size.x, size.y);
    let uwCount = offset;
    rouletteItems.forEach((e) => {
      if (e.name === "5点") {
        drawRainbowPie(uwCount, uwCount + unitWeight, radius, e.color, e.name);
      } else {
        drawPie(uwCount, uwCount + unitWeight, radius, e.color, e.name);
      }
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
    const timer = setInterval(() => {
      degOffset += acceleration;
      degOffset %= 360;
      drawRoulette(degOffset);
    }, 10);
    setRouletteTimer(timer);
  }
  const stopRoulette = () => {
    const a = Math.ceil(Math.random() * 100) + 1000;
    let cnt = 1;
    const timer = setInterval(() => {
      cnt++;
      const newAcceleration = a / cnt - 10;
      acceleration = Math.min(newAcceleration, initialAcceleration);
      degOffset += acceleration;
      degOffset %= 360;
      drawRoulette(degOffset);
      if (acceleration > 0) {
        return;
      }

      clearInterval(timer);
      acceleration = initialAcceleration;
      const currentDeg = Math.ceil(degOffset % 360);
      console.log(currentDeg);
      const stopRouletteItem =
        rouletteItems.find((_, i) => {
          return (
            currentDeg + unitWeight * i < 270 &&
            270 < currentDeg + unitWeight * (i + 1)
          );
        }) || rouletteItems[rouletteItems.length - 1];

      setResult(stopRouletteItem);
      onStop && onStop(stopRouletteItem);
      setCanClickButton("NEXT");
      setIsStopping(false);
    }, 10);
  };
  if (canvasRef === null || canvasRef === undefined) {
    return;
  }
  return (
    <Center flexFlow={"column"}>
      <canvas className="canvas" ref={canvasRef} />

      {canClickButton === "START" && (
        <Button
          colorScheme="blue"
          onClick={() => {
            runRoulette();
            setCanClickButton("STOP");
          }}
          isDisabled={!onStop || canClickButton !== "START"}
        >
          start
        </Button>
      )}
      {canClickButton === "STOP" && (
        <Button
          colorScheme="blue"
          onClick={() => {
            clearInterval(rouletteTimer);
            stopRoulette();
            setIsStopping(true);
          }}
          isDisabled={!onStop || canClickButton !== "STOP" || isStopping}
        >
          stop
        </Button>
      )}

      {canClickButton === "NEXT" && (
        <Button
          colorScheme="blue"
          onClick={() => {
            if (result && onNext) {
              onNext(result.id);
            }
            setCanClickButton("START");
            degOffset = 0;
          }}
          isDisabled={!onNext || canClickButton !== "NEXT"}
        >
          next
        </Button>
      )}
      <Button
        colorScheme="red"
        mt="20px"
        onClick={() => {
          setCanClickButton("START");
          onReset();
        }}
      >
        リセット
      </Button>
    </Center>
  );
};
const toRadian = (degree: number) => {
  return (Math.PI / 180) * degree;
};
