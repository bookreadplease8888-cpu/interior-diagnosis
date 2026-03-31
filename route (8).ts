"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FURNITURE_CATEGORIES } from "@/lib/constants";
import { loadIntake, saveIntake } from "@/lib/storage";
import { Container, PrimaryButton, SectionCard } from "@/components/ui";

export default function FurniturePage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(value: string) {
    setSelected((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
  }

  function handleNext() {
    const intake = loadIntake();
    if (!intake) return router.push("/start");
    saveIntake({ ...intake, furnitureNeeds: selected });
    router.push("/budget");
  }

  return (
    <main className="py-10 sm:py-16">
      <Container className="max-w-3xl">
        <SectionCard>
          <h1 className="text-3xl font-black">欲しい家具を選択</h1>
          <p className="mt-2 text-sm text-black/60">結果ページで優先表示するカテゴリに使います。複数選択OKです。</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {FURNITURE_CATEGORIES.map((item) => {
              const active = selected.includes(item);
              return (
                <button key={item} type="button" onClick={() => toggle(item)} className={`rounded-2xl border px-4 py-4 text-sm font-semibold ${active ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}>
                  {item}
                </button>
              );
            })}
          </div>
          <div className="mt-6">
            <PrimaryButton type="button" onClick={handleNext}>予算入力へ進む</PrimaryButton>
          </div>
        </SectionCard>
      </Container>
    </main>
  );
}
