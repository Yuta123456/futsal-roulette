"use client";
import { FC, useEffect, useRef } from "react";
import { rouletteItems } from "../rouletteItems/rouletteItems";

type RouletteProps = {};

const size = {
  x: 300,
  y: 300,
};
export const Roulette: FC<RouletteProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let radius = 100;
  const unitWeight = 360 / rouletteItems.length;
  const getContext = (): CanvasRenderingContext2D | undefined | null => {
    const canvas = canvasRef.current;

    return canvas?.getContext("2d");
  };
  useEffect(() => {
    const ctx = getContext();
    if (ctx === undefined || ctx === null) {
      return;
    }
    ctx.fillRect(0, 0, 100, 100);
    ctx.save();
    const canvas = canvasRef.current;
    if (canvas === null) {
      return;
    }
    canvas.width = size.x;
    canvas.height = size.y;
    const dst = ctx.createImageData(canvas.width, canvas.height);
    for (var i = 0; i < dst.data.length; i++) {
      dst.data[i] = 255;
    }
    ctx.putImageData(dst, 0, 0);
    drawRoulette(0);
  });

  function drawPie(
    start_deg: number,
    end_deg: number,
    radius: number,
    color: string
  ) {
    var _start_deg = ((360 - start_deg) * Math.PI) / 180;
    var _end_deg = ((360 - end_deg) * Math.PI) / 180;
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
    let uw_count = offset;

    rouletteItems.forEach((e) => {
      drawPie(uw_count, uw_count + unitWeight, radius, e.color);
      uw_count += unitWeight;
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
  if (canvasRef === null || canvasRef === undefined) {
    return;
  }
  return <canvas className="canvas" ref={canvasRef} />;
};
