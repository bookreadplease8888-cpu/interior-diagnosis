import type { StyleKey } from "@/lib/constants";

export type Item = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  url: string | null;
  affiliate_url: string;
  price: number | null;
  category: string | null;
  tags: string[] | null;
  priority: number;
  click_count: number;
  is_active: boolean;
  created_at: string;
};

export type Intake = {
  livingType: string;
  occupation: string;
  age?: string;
  gender?: string;
  furnitureNeeds: string[];
  budget: number;
  floorColor: "light" | "mid" | "dark";
  wallColor: "white" | "gray" | "color";
  answers: Record<string, number>;
};

export type DiagnosisResult = {
  style: StyleKey;
  scores: Record<StyleKey, number>;
  matchedColors: string[];
  why: string;
};

export type SetPlan = {
  label: "ライトセット" | "ベーシックセット" | "プレミアムセット";
  description: string;
  budgetLimit: number;
  total: number;
  items: Item[];
};
