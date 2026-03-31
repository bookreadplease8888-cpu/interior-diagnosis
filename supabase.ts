import type { DiagnosisResult, Intake, Item, SetPlan } from "@/lib/types";

const SET_CONFIG = [
  { label: "ライトセット", ratio: 0.3, description: "気軽に雰囲気を変えたい人向け" },
  { label: "ベーシックセット", ratio: 0.6, description: "見た目とコスパのバランス重視（おすすめ）" },
  { label: "プレミアムセット", ratio: 1.0, description: "しっかり世界観を作りたい人向け" },
] as const;

function scoreItem(item: Item, result: DiagnosisResult, intake: Intake) {
  const tags = item.tags ?? [];
  let score = 0;
  if (tags.includes(result.style)) score += 100;
  if (item.category && intake.furnitureNeeds.includes(item.category)) score += 40;
  if (tags.some((tag) => result.matchedColors.includes(tag))) score += 20;
  if (item.is_active) score += 10;
  score += item.priority * 3;
  score += Math.min(item.click_count, 100);
  return score;
}

export function rankItems(items: Item[], result: DiagnosisResult, intake: Intake) {
  return [...items]
    .filter((item) => item.is_active)
    .sort((a, b) => scoreItem(b, result, intake) - scoreItem(a, result, intake));
}

export function buildSetPlans(items: Item[], intake: Intake, result: DiagnosisResult): SetPlan[] {
  const ranked = rankItems(items, result, intake);
  return SET_CONFIG.map((config) => {
    const budgetLimit = Math.max(1000, Math.floor(intake.budget * config.ratio));
    const usedCategories = new Set<string>();
    const selected: Item[] = [];
    let total = 0;

    for (const item of ranked) {
      if (!item.price || !item.category) continue;
      if (usedCategories.has(item.category)) continue;
      if (total + item.price > budgetLimit) continue;
      selected.push(item);
      usedCategories.add(item.category);
      total += item.price;
      if (selected.length >= 5) break;
    }

    if (selected.length === 0) {
      for (const item of ranked) {
        if (!item.price || !item.category) continue;
        if (usedCategories.has(item.category)) continue;
        selected.push(item);
        usedCategories.add(item.category);
        total += item.price;
        if (selected.length >= 3) break;
      }
    }

    return {
      label: config.label,
      description: config.description,
      budgetLimit,
      total,
      items: selected,
    } satisfies SetPlan;
  });
}
