# TNM MOBILE — App do Artista

Aplicativo web (React + Vite) para os artistas da Tô na Mídia (TNM): cadastro,
acompanhamento financeiro, envio de obras e shows, vitrine pública de shows e
assinatura digital de contratos.

O frontend fala **diretamente com o Supabase** (projeto "APP", o mesmo
consumido pelo painel administrativo do TNM-WEB) através do SDK
`@supabase/supabase-js` — não há backend próprio. Toda regra de acesso é
garantida por Row Level Security (RLS) no banco e pelas policies de storage
(ver `supabase/`).

## Funcionalidades

### Login (`src/pages/Login.jsx`, `TwoFactorAuth.jsx`)
- Login com e-mail/senha
- Recuperação de senha (`RecuperarSenha.jsx` → `NovaSenha.jsx`), via
  `supabase.auth.resetPasswordForEmail`
- Link para cadastro na tela de login, para quem ainda não tem conta

### 2FA por e-mail
- Após a senha, um código de 6 dígitos é enviado por e-mail
  (`supabase.auth.signInWithOtp`) e verificado em `TwoFactorAuth.jsx`
  antes de liberar a sessão — mesmo padrão usado no TNM-WEB

### Cadastro (`Cadastro.jsx`)
- Todos os campos pedidos: nome completo, nacionalidade, RG, CPF, endereço,
  pseudônimo artístico, estado civil, profissão, CEP, órgão emissor, bairro,
  município, UF, e-mail, celular, data de nascimento e estilo musical
- Upload de documento de identificação (RG/CPF/CNH) e comprovante de
  residência para o bucket privado `documentos_artistas`
- Aceite obrigatório da Política de Privacidade
- Persistência na tabela `artistas` do projeto APP
- Redireciona para o login ao concluir

### Dashboard Financeiro (`PainelFinanceiro.jsx`)
- Saldo disponível calculado a partir de `transacoes_financeiras` do
  artista logado (dados importados pelo TNM-WEB a partir dos relatórios do
  ERP)
- Data/hora da última atualização, baseada no carimbo mais recente
  (`atualizado_em`/`criado_em`) das próprias transações — não na hora em
  que o app foi aberto
- Botão "Acesso à ONErpm" com aviso de redirecionamento antes de abrir o
  painel de saque da ONErpm (o app não processa saques)

### Nova Obra (`CadastrarNovaObra.jsx`)
- Capa, título, letra, compositores, ISRC (opcional) e editora (opcional)
- Upload de áudio `.wav`/`.mp3`
- Persistência em `obras`, com status inicial `pendente`

### Meus Lançamentos (`MeusLancamentos.jsx`)
- Cards com capa (URL assinada do bucket privado `obras`), título e ISRC de
  cada obra cadastrada pelo artista

### Novo Show (`CadastrarNovoShow.jsx`)
- Capa, data, horário, endereço, URL de ingressos e WhatsApp de contato
- Envio para moderação no ERP: todo show criado entra como `pendente` e só
  aparece na vitrine pública após aprovação pelo admin

### Vitrine de Shows (`VitrindeShows.jsx`)
- Card "Compre Nossos Produtos" com imagem e link vindos da tabela
  `banners_promocionais` (editável pela equipe TNM sem novo deploy)
- Shows aprovados com banner, título, data, horário, local e botão de
  ingressos
- Ordenados por prioridade definida no ERP (alta → média → baixa), com a
  data do evento como critério de desempate

### Contratos (`AssinaturaBranding.jsx`)
- Geração de documentos prontos (Distribuição Digital, Edição Musical com
  seleção de obra, Autorização de Uso de Imagem) a partir de templates em
  `src/templates/documentos/`
- Upload de um contrato em PDF
- Aceite da Política de Privacidade e declaração de obra inédita
- Assinatura digital (nome + CPF + data/hora), carimbada diretamente no PDF
  (`src/utils/carimbarContrato.js`)
- Download automático do PDF já assinado/carimbado, e cópia enviada ao
  bucket privado `contratos`

## Arquitetura

- `src/lib/supabaseClient.js` — único cliente Supabase do app (projeto APP)
- `src/services/api.js` — camada de acesso a dados (artistas, obras, shows,
  contratos, transações, banners)
- `src/hooks/` — `useSession`, `useArtistaAtual`, `useObras`, `useShows`,
  `useBanners`
- `src/components/ProtectedRoute.jsx` — bloqueia rotas privadas sem sessão
- `src/utils/` — geração e carimbo de PDF, split financeiro, sanitização de
  nome de arquivo, validações

## Configuração

1. Copie `frontend/.env.example` para `frontend/.env` e preencha
   `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` com as credenciais do
   projeto Supabase **APP**.
2. Rode, no SQL Editor do projeto APP, os scripts em `supabase/` (na ordem:
   `migration_cadastro_completo.sql`, `migration_transacoes_financeiras.sql`,
   `migration_mobile_faltantes.sql`, `fix_auth_user_id_link.sql`,
   `banners_promocionais.sql`).
3. `cd frontend && npm install`
4. `npm run dev`

## Pendências conhecidas

- Não há testes automatizados no projeto.
- O split financeiro exibido no Dashboard (ONErpm/TNM/artista/editora) usa
  percentuais fixos definidos em `src/utils/calcularSplitFinanceiro.js`;
  caso a regra de negócio real varie por artista/contrato, esse cálculo
  precisará ser parametrizado.
