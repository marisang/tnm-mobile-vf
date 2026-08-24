-- =====================================================================
-- Migração: peças faltantes para o TNM-MOBILE (Nova Obra, Novo Show,
-- Contratos/Assinatura, Documentos Gerados)
-- Projeto Supabase "APP"
-- =====================================================================

-- 1) obras: capa e áudio da obra (Nova Obra: "Upload da capa" /
-- "Upload de áudio"). O schema atual não tinha essas colunas.
alter table public.obras
  add column if not exists capa_url text,
  add column if not exists audio_url text;

comment on column public.obras.capa_url is 'Caminho da imagem de capa no bucket privado "obras" (ex: capas/<uuid-do-login>/<timestamp>_<nome>).';
comment on column public.obras.audio_url is 'Caminho do arquivo de áudio (.wav/.mp3) no bucket privado "obras" (ex: audios/<uuid-do-login>/<timestamp>_<nome>).';

-- 2) shows: horário do evento. O schema atual só tinha `data_evento`
-- como DATE (sem hora) — "Novo Show" pede data E horário.
alter table public.shows
  add column if not exists hora_evento time;

comment on column public.shows.hora_evento is 'Horário do show (data_evento guarda só a data).';

-- 3) contratos: aceite de política de privacidade e declaração de obra
-- inédita, exigidos no fluxo de assinatura (além das colunas de
-- documento/assinatura já adicionadas em migration_contratos_documentos.sql).
alter table public.contratos
  add column if not exists aceite_politica_privacidade_em timestamptz,
  add column if not exists aceite_obra_inedita_em timestamptz;

comment on column public.contratos.aceite_politica_privacidade_em is 'Data/hora em que o artista aceitou a Política de Privacidade ao assinar este contrato.';
comment on column public.contratos.aceite_obra_inedita_em is 'Data/hora em que o artista declarou que a obra é inédita ao assinar este contrato.';

-- 4) Habilita RLS em obras/compositores (as políticas de acesso ficam
-- em fix_auth_user_id_link.sql, com a comparação certa via
-- artistas.auth_user_id).
alter table public.obras enable row level security;
alter table public.compositores enable row level security;

-- 5) Buckets de storage

-- "obras": PRIVADO — obra pode estar pendente de moderação e o áudio
-- ainda não deve ficar público antes disso.
insert into storage.buckets (id, name, public)
values ('obras', 'obras', false)
on conflict (id) do nothing;

-- "documentos": PRIVADO — PDFs gerados (contêm CPF, endereço etc.).
insert into storage.buckets (id, name, public)
values ('documentos', 'documentos', false)
on conflict (id) do nothing;

-- "shows": público (banners de divulgação) — já deve existir; garante
-- que existe, caso este script rode num projeto novo.
insert into storage.buckets (id, name, public)
values ('shows', 'shows', true)
on conflict (id) do nothing;


-- Bucket "obras": caminho é capas/<uid>/arquivo ou audios/<uid>/arquivo.
drop policy if exists "obras_storage_artista_le" on storage.objects;
create policy "obras_storage_artista_le"
  on storage.objects for select
  using (bucket_id = 'obras' and (storage.foldername(name))[2] = auth.uid()::text);

drop policy if exists "obras_storage_artista_upload" on storage.objects;
create policy "obras_storage_artista_upload"
  on storage.objects for insert
  with check (bucket_id = 'obras' and (storage.foldername(name))[2] = auth.uid()::text);

-- Bucket "documentos": caminho é <uid>/arquivo.pdf.
drop policy if exists "documentos_storage_artista_le" on storage.objects;
create policy "documentos_storage_artista_le"
  on storage.objects for select
  using (bucket_id = 'documentos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "documentos_storage_artista_upload" on storage.objects;
create policy "documentos_storage_artista_upload"
  on storage.objects for insert
  with check (bucket_id = 'documentos' and (storage.foldername(name))[1] = auth.uid()::text);

-- Bucket "shows": caminho de upload do artista é banners/<uid>/arquivo
-- (uploads do admin usam banners/admin/... via service role, que
-- ignora RLS — não precisa de política própria).
drop policy if exists "shows_storage_artista_upload" on storage.objects;
create policy "shows_storage_artista_upload"
  on storage.objects for insert
  with check (bucket_id = 'shows' and (storage.foldername(name))[2] = auth.uid()::text);


-- ---------------------------------------------------------------------
-- 6) obras: campo "editora" (opcional), pedido no formulário de Nova
-- Obra junto com o ISRC — não existia no schema.
-- ---------------------------------------------------------------------
alter table public.obras
  add column if not exists editora text;

comment on column public.obras.editora is 'Nome da editora responsável pela obra (opcional, informado em "Nova Obra").';
