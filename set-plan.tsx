import { Container, LinkButton } from "@/components/ui";

export function Hero() {
  return (
    <section className="bg-[radial-gradient(circle_at_top,_#f8f4ff,_#f7f7f7_50%,_#ffffff)] py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold tracking-wide text-black/70">
            10問でわかる あなたの部屋タイプ診断
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-black sm:text-6xl">
            あなたに合うインテリアと家具がわかる、
            <span className="block">部屋タイプ診断アプリ</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
            北欧・ホテルライク・韓国風・ブルックリン・ジャパンディなど、部屋の好みを10問で診断。結果に合わせて、予算内で揃うおすすめ家具も提案します。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/start" className="w-full sm:w-auto">無料で診断を始める</LinkButton>
            <a href="#sample" className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black sm:w-auto">結果イメージを見る</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
