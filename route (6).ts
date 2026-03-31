"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/constants";
import { saveIntake } from "@/lib/storage";
import { Container, PrimaryButton, SectionCard } from "@/components/ui";

export default function QuizPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const progress = useMemo(() => Math.round((Object.keys(answers).length / QUIZ_QUESTIONS.length) * 100), [answers]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const intake = {
      livingType: params.get("livingType") || "一人暮らし",
      occupation: params.get("occupation") || "社会人",
      age: params.get("age") || "",
      gender: params.get("gender") || "",
      floorColor: (params.get("floorColor") || "mid") as "light" | "mid" | "dark",
      wallColor: (params.get("wallColor") || "white") as "white" | "gray" | "color",
      budget: 30000,
      furnitureNeeds: [],
      answers,
    };
    saveIntake(intake);
    router.push("/furniture");
  }

  return (
    <main className="py-10 sm:py-16">
      <Container className="max-w-4xl">
        <SectionCard>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black">診断10問</h1>
              <p className="mt-2 text-sm text-black/60">回答傾向からスタイルをスコア判定します。</p>
            </div>
            <div className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-bold">{progress}%</div>
          </div>
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {QUIZ_QUESTIONS.map((question, idx) => (
              <div key={question.id} className="rounded-3xl border border-black/10 p-5">
                <h2 className="text-lg font-black">Q{idx + 1}. {question.title}</h2>
                <div className="mt-4 grid gap-3">
                  {question.options.map((option, optionIndex) => {
                    const active = answers[question.id] === optionIndex;
                    return (
                      <label key={option.label} className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-semibold ${active ? "border-black bg-black text-white" : "border-black/10 bg-white text-black"}`}>
                        <input type="radio" className="hidden" name={question.id} checked={active} onChange={() => setAnswers({ ...answers, [question.id]: optionIndex })} />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            <PrimaryButton type="submit" disabled={Object.keys(answers).length !== QUIZ_QUESTIONS.length}>家具選択へ進む</PrimaryButton>
          </form>
        </SectionCard>
      </Container>
    </main>
  );
}
