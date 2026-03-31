import type { Intake } from "@/lib/types";

const STORAGE_KEY = "interior-diagnosis-intake";

export function saveIntake(data: Intake) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadIntake(): Intake | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Intake;
  } catch {
    return null;
  }
}
