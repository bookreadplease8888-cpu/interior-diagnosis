"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { diagnoseStyle } from "@/lib/diagnosis";
import { loadIntake, saveIntake } from "@/lib/storage";
import { sanitizeBudget } from "@/lib/utils";
import { Container, PrimaryButton, SectionCard } from "@/components/ui";

export default function BudgetPage() {
  const router = useRouter();
  const [budget, setBudget] = useState("30000");

  function handleNext() {
    const intake = loadIntake();
    if (!intake) return router.push("/start");
    const next = { ...intake, budget: sanitizeBudget(budget) };
    saveIntake(next);
    const result = diagnoseStyle(next);
    router.push(`/result/${result.style}`);
  }

  return (
    <main className="py-10 sm:py-16">
      <Container className="max-w-3xl">
        <SectionCard>
          <h1 className="text-3xl font-black">予算を入力してください</h1>
          <p className="mt-2 text-sm text-black/60">1000円〜500万円の範囲で入力できます。</p>
          <div className="mt-6 grid gap-3">
            <input type="number" min={1000} max={5000000} value={budget} onChange={(e) => setBudget(e.target.value)} className="rounded-2xl border border-black/10 px-4 py-4 text-lg font-bold" />
            <PrimaryButton type="button" onClick={handleNext}>結果を見る</PrimaryButton>
          </div>
        </SectionCard>
      </Container>
    </main>
  );
}
