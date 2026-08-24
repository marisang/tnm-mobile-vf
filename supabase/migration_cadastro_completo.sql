-- =====================================================================
-- Adiciona:
-- 1. Campo de estilo musical (gênero)
-- 2. Campo para anexo de documento de identificação (RG, CPF ou CNH)
-- 3. Campo para anexo de comprovante de residência
-- =====================================================================

-- 1) artistas: adiciona campo de estilo musical
alter table public.artistas
  add column if not exists estilo_musical text;

comment on column public.artistas.estilo_musical is 'Estilo/gênero musical do artista (ex: Sertanejo, Pop, Rock, etc.)';

-- 2) artistas: adiciona campo para documento de identificação
alter table public.artistas
  add column if not exists documento_identificacao_url text;

comment on column public.artistas.documento_identificacao_url is 'Caminho do documento de identificação (RG, CPF ou CNH) no bucket privado "documentos_artistas" (ex: identificacao/<uuid-do-login>/<timestamp>_<nome>).';

-- 3) artistas: adiciona campo para comprovante de residência
alter table public.artistas
  add column if not exists comprovante_residencia_url text;

comment on column public.artistas.comprovante_residencia_url is 'Caminho do comprovante de residência no bucket privado "documentos_artistas" (ex: comprovantes/<uuid-do-login>/<timestamp>_<nome>).';

-- 4) artistas: adiciona campo para indicar vínculo editorial
alter table public.artistas
  add column if not exists vinculo_editorial boolean default false;

comment on column public.artistas.vinculo_editorial is 'Indica se o artista possui vínculo com editora musical (afeta cálculo de split financeiro).';

-- 5) Cria bucket de storage para documentos de artistas (PRIVADO)
insert into storage.buckets (id, name, public)
values ('documentos_artistas', 'documentos_artistas', false)
on conflict (id) do nothing;

-- 5) Políticas de storage para o bucket "documentos_artistas"

-- Permite que o artista leia seus próprios documentos
drop policy if exists "documentos_artistas_storage_artista_le" on storage.objects;
create policy "documentos_artistas_storage_artista_le"
  on storage.objects for select
  using (bucket_id = 'documentos_artistas' and (storage.foldername(name))[2] = auth.uid()::text);

-- Permite que o artista faça upload de seus próprios documentos
drop policy if exists "documentos_artistas_storage_artista_upload" on storage.objects;
create policy "documentos_artistas_storage_artista_upload"
  on storage.objects for insert
  with check (bucket_id = 'documentos_artistas' and (storage.foldername(name))[2] = auth.uid()::text);

-- Permite que o artista atualize/substitua seus próprios documentos
drop policy if exists "documentos_artistas_storage_artista_atualiza" on storage.objects;
create policy "documentos_artistas_storage_artista_atualiza"
  on storage.objects for update
  using (bucket_id = 'documentos_artistas' and (storage.foldername(name))[2] = auth.uid()::text)
  with check (bucket_id = 'documentos_artistas' and (storage.foldername(name))[2] = auth.uid()::text);

-- Permite que o artista delete seus próprios documentos
drop policy if exists "documentos_artistas_storage_artista_deleta" on storage.objects;
create policy "documentos_artistas_storage_artista_deleta"
  on storage.objects for delete
  using (bucket_id = 'documentos_artistas' and (storage.foldername(name))[2] = auth.uid()::text);

