
create table if not exists public.banners_promocionais (
  id bigint generated always as identity primary key,
  titulo text,                     -- texto opcional exibido no botão (ex.: "COMPRE NOSSOS PRODUTOS")
  imagem_url text not null,        -- URL pública da imagem (Supabase Storage, bucket "banners")
  link_url text not null,          -- para onde o usuário é levado ao tocar no banner
  ativo boolean not null default true,
  ordem integer not null default 0, -- define a ordem quando houver mais de um banner ativo
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table public.banners_promocionais is
  'Banners promocionais exibidos no topo da Vitrine de Shows (ex.: "Compre Nossos Produtos").';

-- Mantém atualizado_em em dia a cada alteração
create or replace function public.set_atualizado_em()
returns trigger as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_banners_atualizado_em on public.banners_promocionais;
create trigger trg_banners_atualizado_em
  before update on public.banners_promocionais
  for each row execute function public.set_atualizado_em();

-- RLS: leitura pública apenas dos banners ativos.
-- Criação/edição/exclusão ficam restritas ao service_role (usado pelo
-- backend/admin), então não é preciso política de escrita para o anon.
alter table public.banners_promocionais enable row level security;

drop policy if exists "banners_promocionais_leitura_publica" on public.banners_promocionais;
create policy "banners_promocionais_leitura_publica"
  on public.banners_promocionais
  for select
  using (ativo = true);

-- Storage: bucket público para as imagens dos banners.
insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

drop policy if exists "banners_bucket_leitura_publica" on storage.objects;
create policy "banners_bucket_leitura_publica"
  on storage.objects for select
  using (bucket_id = 'banners');


