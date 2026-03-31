"use client";

import { useEffect, useMemo, useState } from "react";
import { COLOR_OPTIONS, FURNITURE_CATEGORIES, STYLE_MAP } from "@/lib/constants";
import type { Item } from "@/lib/types";
import { Container, PrimaryButton, SectionCard } from "@/components/ui";

const defaultForm = {
  title: "",
  description: "",
  image_url: "",
  url: "",
  affiliate_url: "",
  price: 0,
  category: "table",
  tags: ["nordic", "white"],
  priority: 0,
  is_active: true,
};

export function AdminDashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const allTags = useMemo(() => [
    ...Object.keys(STYLE_MAP),
    ...FURNITURE_CATEGORIES,
    ...COLOR_OPTIONS,
  ], []);

  async function fetchItems() {
    const res = await fetch("/api/admin/items");
    const json = await res.json();
    if (res.ok) setItems(json.items || []);
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? "PATCH" : "POST";
    const endpoint = editingId ? `/api/admin/items/${editingId}` : "/api/admin/items";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) return alert("保存に失敗しました");
    setEditingId(null);
    setForm(defaultForm);
    fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("削除しますか？")) return;
    const res = await fetch(`/api/admin/items/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("削除に失敗しました");
    fetchItems();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    location.href = "/admin/login";
  }

  return (
    <main className="py-10 sm:py-16">
      <Container className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">admin管理</h1>
            <p className="mt-2 text-sm text-black/60">商品追加・編集・削除・表示ON/OFF・priority・タグ管理ができます。</p>
          </div>
          <PrimaryButton type="button" onClick={handleLogout}>ログアウト</PrimaryButton>
        </div>

        <SectionCard>
          <h2 className="text-2xl font-black">商品フォーム</h2>
          <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-2xl border border-black/10 px-4 py-3" placeholder="商品名" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="rounded-2xl border border-black/10 px-4 py-3" placeholder="アフィリエイトURL" value={form.affiliate_url} onChange={(e) => setForm({ ...form, affiliate_url: e.target.value })} />
              <input className="rounded-2xl border border-black/10 px-4 py-3" placeholder="通常URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
              <input className="rounded-2xl border border-black/10 px-4 py-3" placeholder="画像URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              <input className="rounded-2xl border border-black/10 px-4 py-3" type="number" placeholder="価格" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
              <select className="rounded-2xl border border-black/10 px-4 py-3" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {FURNITURE_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input className="rounded-2xl border border-black/10 px-4 py-3" type="number" placeholder="priority" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })} />
              <label className="flex items-center gap-3 rounded-2xl border border-black/10 px-4 py-3 text-sm font-semibold"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> 表示する</label>
            </div>
            <textarea className="min-h-28 rounded-2xl border border-black/10 px-4 py-3" placeholder="説明文" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div>
              <p className="mb-3 text-sm font-bold">タグ選択（スタイル・カテゴリ・色）</p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const active = form.tags.includes(tag);
                  return (
                    <button key={tag} type="button" onClick={() => setForm({ ...form, tags: active ? form.tags.filter((x) => x !== tag) : [...form.tags, tag] })} className={`rounded-full px-3 py-2 text-xs font-bold ${active ? "bg-black text-white" : "bg-neutral-100 text-black"}`}>
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <PrimaryButton type="submit" disabled={loading}>{loading ? "保存中..." : editingId ? "更新する" : "追加する"}</PrimaryButton>
          </form>
        </SectionCard>

        <SectionCard>
          <h2 className="text-2xl font-black">登録商品</h2>
          <div className="mt-5 overflow-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/10 text-left">
                  <th className="px-3 py-3">商品名</th><th className="px-3 py-3">カテゴリ</th><th className="px-3 py-3">価格</th><th className="px-3 py-3">priority</th><th className="px-3 py-3">click</th><th className="px-3 py-3">表示</th><th className="px-3 py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-black/5 align-top">
                    <td className="px-3 py-3">
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs text-black/50">{item.tags?.join(", ")}</p>
                    </td>
                    <td className="px-3 py-3">{item.category}</td>
                    <td className="px-3 py-3">{item.price}</td>
                    <td className="px-3 py-3">{item.priority}</td>
                    <td className="px-3 py-3">{item.click_count}</td>
                    <td className="px-3 py-3">{item.is_active ? "ON" : "OFF"}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button type="button" className="rounded-xl bg-neutral-100 px-3 py-2 font-semibold" onClick={() => {
                          setEditingId(item.id);
                          setForm({
                            title: item.title,
                            description: item.description || "",
                            image_url: item.image_url || "",
                            url: item.url || "",
                            affiliate_url: item.affiliate_url,
                            price: item.price || 0,
                            category: item.category || "table",
                            tags: item.tags || [],
                            priority: item.priority,
                            is_active: item.is_active,
                          });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}>編集</button>
                        <button type="button" className="rounded-xl bg-red-50 px-3 py-2 font-semibold text-red-700" onClick={() => handleDelete(item.id)}>削除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </Container>
    </main>
  );
}
