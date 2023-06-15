"use client";
import { useRouter } from "next/navigation";
import { Roulette } from "./components/Roulette";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <button
        onClick={() => {
          router.push("/roulette");
        }}
      >
        ルーレット
      </button>
      <button
        onClick={() => {
          router.push("/king-game");
        }}
      >
        王様ゲーム
      </button>
    </main>
  );
}
