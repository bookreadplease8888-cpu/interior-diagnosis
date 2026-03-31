import type { SetPlan } from "@/lib/types";
import { currency } from "@/lib/utils";

export function SetPlanCard({ plan, recommended = false }: { plan: SetPlan; recommended?: boolean }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black">{plan.label}</h3>
            {recommended ? <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">おすすめ</span> : null}
          </div>
          <p className="mt-1 text-sm text-black/60">{plan.description}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-black/50">上限目安</p>
          <p className="font-bold">{currency(plan.budgetLimit)}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {plan.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl bg-neutral-50 px-4 py-3 text-sm">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-black/50">{item.category}</p>
            </div>
            <span className="font-bold">{currency(item.price)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4">
        <span className="text-sm text-black/60">合計</span>
        <span className="text-lg font-black">{currency(plan.total)}</span>
      </div>
    </div>
  );
}
