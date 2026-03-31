const STORAGE_KEY = "interior-diagnosis-intake";

export function saveIntake(data: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadIntake(): any {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as any;
  } catch {
    return null;
  }
}
