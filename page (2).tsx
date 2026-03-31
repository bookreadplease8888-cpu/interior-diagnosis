import { Hero } from "@/components/hero";
import { Container, LinkButton, SectionCard } from "@/components/ui";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Container className="pb-16">
        <div id="sample" className="grid gap-6 md:grid-cols-3">
          {[
            ["診断は10問だけ", "迷わせないUIでサクッと診断できます。"],
            ["予算内のセット提案", "ライト・ベーシック・プレミアムの3段階で表示。"],
            ["結果をXでシェア", "スクショ映えする結果画面とシェア導線付き。"],
          ].map(([title, desc]) => (
            <SectionCard key={title}>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-black/70">{desc}</p>
            </SectionCard>
          ))}
        </div>
        <SectionCard className="mt-8 bg-black text-white">
          <h2 className="text-2xl font-black">まずは診断を完成させよう</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">属性入力 → 診断10問 → 家具選択 → 予算入力 → 結果ページ → 商品提案 → Xシェアまで一通り動く構成です。</p>
          <div className="mt-5">
            <LinkButton href="/start" className="bg-white text-black">診断を始める</LinkButton>
          </div>
        </SectionCard>
      </Container>
    </main>
  );
}
