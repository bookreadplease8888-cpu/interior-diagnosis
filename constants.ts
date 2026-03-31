# interior-diagnosis-complete-final

Next.js + Supabase + Vercel 前提の「部屋・インテリア診断アプリ」完成版テンプレートです。

## できること
- トップ → 属性入力 → 診断10問 → 家具選択 → 予算入力 → 結果ページ
- 結果スタイルに応じた商品提案
- ライト / ベーシック / プレミアムの3段階セット提案
- 同一カテゴリ重複を避けるセット生成
- 床色 / 壁色 / 色タグ / スタイルタグ連携
- admin ログイン / 商品追加 / 編集 / 削除 / 表示ON/OFF / priority
- 商品クリック時の click_count 増加
- metadata / OGP / robots / sitemap / 結果ページURL 付き
- 結果ページの X シェアボタン

## 1. セットアップ
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. 必須環境変数
`.env.local` に以下を設定
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## 3. Supabase SQL
以下を SQL Editor に流してください。

```sql
create extension if not exists "uuid-ossp";

create table if not exists public.items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  image_url text,
  url text,
  affiliate_url text not null,
  price integer,
  category text,
  tags text[] default '{}',
  priority integer default 0,
  click_count integer default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create or replace function public.increment_click_count(item_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.items
  set click_count = coalesce(click_count, 0) + 1
  where id = item_id;
end;
$$;
```

## 4. サンプルデータ
```sql
insert into public.items (title, description, image_url, url, affiliate_url, price, category, tags, priority, is_active)
values
('北欧ローテーブル', '木と白のバランスが取りやすい定番テーブル', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', 'https://example.com/item1', 'https://example.com/affiliate1', 9800, 'table', array['nordic','table','wood','white'], 20, true),
('ブラックフロアライト', 'ホテル感やブルックリン感を作りやすい照明', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop', 'https://example.com/item2', 'https://example.com/affiliate2', 7800, 'lighting', array['hotel','brooklyn','lighting','black'], 18, true),
('淡色ラグ', '韓国風や北欧系に合わせやすいラグ', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', 'https://example.com/item3', 'https://example.com/affiliate3', 6200, 'rug', array['korean','nordic','rug','beige'], 16, true);
```

## 5. Vercel 公開
1. GitHub に **解凍後の中身全部** をアップロード
2. Vercel でそのリポジトリを Import
3. Environment Variables に `.env.local` と同じ値を登録
4. Deploy

## 6. admin ログイン
- URL: `/admin/login`
- 初回パスワード: `password8424teniSu/`
- 本番では必ず `ADMIN_PASSWORD` を変更してください

## 7. 補足
- 結果ページ URL 例: `/result/nordic`
- 価格免責と PR 表記は結果ページと商品カードに入っています
- 結果ページの share ボタンで X に投稿できます
- 予算セット生成は、優先順 `style一致 → 家具選択 → 色一致 → active → priority → click_count` を反映しています

## 8. 次にやること
- 商品を 30 件以上入れる
- 実画像・実アフィリエイトリンクへ置換
- OGP 画像を `public/og-image.png` に差し替え
- 必要なら admin パスワード変更 UI を追加
