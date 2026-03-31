"use client";

import Image from "next/image";

export function ProductCard({ item }: { item: any }) {
  async function handleClick() {
    try {
      await fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
    } catch {}
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-neutral-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-black/50">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="mb-2 text-xs font-semibold text-pink-600">
          ※本ページにはPR（アフィリエイトリンク）が含まれます
        </p>

        <h3 className="text-lg font-bold text-black">{item.title}</h3>

        <p className="mt-2 text-sm text-black/65">
          {item.description ?? "診断結果に相性の良いおすすめ商品です。"}
        </p>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-semibold">{item.price}</span>
          <span className="text-black/50">人気 {item.click_count}</span>
        </div>

        <a
          href={item.affiliate_url}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white"
        >
          商品を見る（PR） →
        </a>
      </div>
    </article>
  );
}
