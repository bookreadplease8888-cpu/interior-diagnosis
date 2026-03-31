"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container, PrimaryButton, SectionCard } from "@/components/ui";

export default function StartPage() {
  const router = useRouter();
  const [form, setForm] = useState({ livingType: "一人暮らし", occupation: "社会人", age: "", gender: "", floorColor: "mid", wallColor: "white" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(form as Record<string, string>);
    router.push(`/quiz?${params.toString()}`);
  }

  return (
    <main className="py-10 sm:py-16">
      <Container className="max-w-3xl">
        <SectionCard>
          <h1 className="text-3xl font-black">属性入力</h1>
          <p className="mt-3 text-sm leading-6 text-black/65">必須項目を増やしすぎず、診断精度に必要な情報だけ入力します。</p>
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-semibold">住み方
              <select className="rounded-2xl border border-black/10 px-4 py-3" value={form.livingType} onChange={(e) => setForm({ ...form, livingType: e.target.value })}>
                <option>一人暮らし</option><option>実家暮らし</option><option>同棲</option><option>家族暮らし</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">学生 or 社会人
              <select className="rounded-2xl border border-black/10 px-4 py-3" value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })}>
                <option>学生</option><option>社会人</option>
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">年代（任意）
                <input className="rounded-2xl border border-black/10 px-4 py-3" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="20代" />
              </label>
              <label className="grid gap-2 text-sm font-semibold">性別（任意）
                <input className="rounded-2xl border border-black/10 px-4 py-3" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} placeholder="未回答でもOK" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold">床の色
                <select className="rounded-2xl border border-black/10 px-4 py-3" value={form.floorColor} onChange={(e) => setForm({ ...form, floorColor: e.target.value })}>
                  <option value="light">明るい（白・ベージュ）</option>
                  <option value="mid">中間（ナチュラル木）</option>
                  <option value="dark">暗い（ブラウン・黒）</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold">壁の色
                <select className="rounded-2xl border border-black/10 px-4 py-3" value={form.wallColor} onChange={(e) => setForm({ ...form, wallColor: e.target.value })}>
                  <option value="white">白系</option>
                  <option value="gray">グレー系</option>
                  <option value="color">色あり</option>
                </select>
              </label>
            </div>
            <PrimaryButton type="submit">10問の診断に進む</PrimaryButton>
          </form>
        </SectionCard>
      </Container>
    </main>
  );
}
