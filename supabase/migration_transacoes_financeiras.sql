-- =====================================================================
-- Garante que a tabela transacoes_financeiras tenha todos os campos
-- necessários para importação de dados do ERP (planilha)
-- =====================================================================

-- 1) Garante que a tabela transacoes_financeiras existe
create table if not exists public.transacoes_financeiras (
  id uuid primary key default gen_random_uuid(),
  artista_id integer not null references public.artistas(id) on delete cascade,
  data_competencia date not null,
  valor_bruto numeric(12,2) not null default 0,
  valor_liquido numeric(12,2),
  descricao text,
  origem text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table public.transacoes_financeiras is 'Transações financeiras dos artistas (faturamento importado do ERP)';

-- 2) Adiciona colunas adicionais se não existirem
alter table public.transacoes_financeiras
  add column if not exists mes_referencia integer,
  add column if not exists ano_referencia integer;

comment on column public.transacoes_financeiras.mes_referencia is 'Mês de referência da transação (1-12)';
comment on column public.transacoes_financeiras.ano_referencia is 'Ano de referência da transação';

-- 3) Cria índices para otimizar consultas por artista e data
create index if not exists idx_transacoes_artista_data 
  on public.transacoes_financeiras(artista_id, data_competencia desc);

create index if not exists idx_transacoes_mes_ano 
  on public.transacoes_financeiras(artista_id, ano_referencia, mes_referencia);

-- 4) Habilita RLS (as políticas já foram criadas no fix_auth_user_id_link.sql)
alter table public.transacoes_financeiras enable row level security;

-- 5) Garante que as políticas de RLS existam
drop policy if exists "transacoes_artista_le_proprio" on public.transacoes_financeiras;
create policy "transacoes_artista_le_proprio"
  on public.transacoes_financeiras for select
  using (artista_id in (select id from public.artistas where auth_user_id = auth.uid()));

-- O artista NUNCA deve poder criar/editar as próprias transações
-- financeiras
drop policy if exists "transacoes_artista_cria_proprio" on public.transacoes_financeiras;

-- 6) Função para atualizar automaticamente o campo atualizado_em
create or replace function public.atualizar_timestamp_transacoes()
returns trigger as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_atualizar_timestamp_transacoes on public.transacoes_financeiras;
create trigger trigger_atualizar_timestamp_transacoes
  before update on public.transacoes_financeiras
  for each row
  execute function public.atualizar_timestamp_transacoes();
