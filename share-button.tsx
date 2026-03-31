import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-3xl border border-black/10 bg-white/90 p-5 shadow-sm sm:p-6", className)}>{children}</div>;
}

export function PrimaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={cn("inline-flex min-h-12 items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50", className)}>{children}</button>;
}

export function LinkButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <Link href={href} className={cn("inline-flex min-h-12 items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90", className)}>{children}</Link>;
}
