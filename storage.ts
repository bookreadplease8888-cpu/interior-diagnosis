import { STYLE_MAP, type StyleKey, QUIZ_QUESTIONS } from "@/lib/constants";
import type { DiagnosisResult, Intake } from "@/lib/types";

const styleKeys = Object.keys(STYLE_MAP) as StyleKey[];

function deriveColorMatches(floorColor: Intake["floorColor"], wallColor: Intake["wallColor"]) {
  const list = new Set<string>();
  if (floorColor === "light") {
    list.add("white");
    list.add("beige");
    list.add("wood");
  }
  if (floorColor === "mid") {
    list.add("wood");
    list.add("brown");
    list.add("beige");
  }
  if (floorColor === "dark") {
    list.add("black");
    list.add("brown");
    list.add("gray");
  }
  if (wallColor === "white") list.add("white");
  if (wallColor === "gray") list.add("gray");
  if (wallColor === "color") {
    list.add("beige");
    list.add("green");
    list.add("blue");
  }
  return [...list];
}

export function diagnoseStyle(intake: Intake): DiagnosisResult {
  const scores = Object.fromEntries(styleKeys.map((key) => [key, 0])) as Record<StyleKey, number>;

  for (const question of QUIZ_QUESTIONS) {
    const answerIndex = intake.answers[question.id] ?? 0;
    const option = question.options[answerIndex];
    if (!option) continue;
    for (const [style, score] of Object.entries(option.scores) as [StyleKey, number][]) {
      scores[style] += score;
    }
  }

  if (intake.livingType.includes("一人")) scores.korean += 1;
  if (intake.occupation === "社会人") scores.hotel += 1;
  if (intake.furnitureNeeds.includes("desk")) scores.hotel += 1;
  if (intake.furnitureNeeds.includes("lighting")) scores.brooklyn += 1;
  if (intake.floorColor === "light") scores.nordic += 1;
  if (intake.floorColor === "dark") scores.brooklyn += 1;
  if (intake.wallColor === "gray") scores.hotel += 1;
  if (intake.wallColor === "color") scores.korean += 1;

  const sorted = [...styleKeys].sort((a, b) => scores[b] - scores[a]);
  const style = sorted[0] ?? "nordic";
  const matchedColors = deriveColorMatches(intake.floorColor, intake.wallColor);

  const whyParts = [
    `「${STYLE_MAP[style].label}」が最も高スコアでした。`,
    intake.floorColor === "light" ? "床が明るめなのでやわらかい色となじみやすく、" : intake.floorColor === "dark" ? "床が濃いめなのでコントラストや重厚感が映えやすく、" : "床が中間色なので木系のアイテムをつなぎに使いやすく、",
    intake.wallColor === "white" ? "白壁に合わせやすい色を優先しています。" : intake.wallColor === "gray" ? "グレー壁に合う無彩色も優先しています。" : "色壁に合わせやすい淡色・自然色も考慮しています。",
  ];

  return { style, scores, matchedColors, why: whyParts.join("") };
}
