# Busca Moderna (Concierge IA) - Setembro.net

**Overview:**
Implementação de um sistema de busca inteligente de alto nível com "Concierge IA". O projeto utilizará Busca Híbrida (Semântica via Gemini `text-embedding-004` + Full-Text Search via PostgreSQL), com interfaces avançadas focadas em UX e Captação de Leads.
As personas de IA (Julia para estratégia/retaguarda e Ana para interação/conversão no front) guiarão o fluxo de dados.

**Project Type:** WEB

**Success Criteria:**
1. ✅ **Banco de Dados:** Extensão `pgvector` habilitada; coluna `embedding` populada via trigger ou lógica administrativa.
2. ✅ **Integração IA (Julia):** Posts salvos no `/admin` geram seus vetores usando `text-embedding-004` do Google AI Pro.
3. ✅ **Concierge Frontend (Ana):** Barra de busca destacada ("Search-First") na Hero.
4. ✅ **UI Flutuante:** Floating Action Menu (FAM) persistente e interativo em todo o site.
5. ✅ **Fallback/Conversão:** Respostas inconclusivas acionam um fluxo elegante de captura de lead (Lead Fingerprinting).

---

## Estrutura e Flow (Architecture)

### 1. Backend e IA (Agente Especialista Backend)
- **Supabase / Vector DB:** Uma migração ou script SQL para:
  - `create extension if not exists vector;`
  - Adicionar a coluna `embedding vector(1536)` (ajustar a dimensão do Gemini) à tabela `blog_posts`.
  - Criar função Postgres (RPC) `hybrid_search_posts(query_text, query_embedding, match_count)` que execute a similaridade via `cosine distance` `<=>` combinada com search index.
- **Workflow da Julia (Retaguarda):**
  - Identificar a action ou API de salvar posts e injetar a chamada ao `@google/genai` (ou SDK equivalente) para gerar o embedding do conteúdo do post e atualizá-lo.

### 2. Frontend e UI (Agente Especialista Frontend)
- **Design Philosophy (Ana):** "Neo-Corporate / High-Tech". Evitar templates padrão, usar animações de transição suaves (spring physics) e geometria sofisticada. Nenhuma cor roxa (Purple Ban).
- **Hero Search-First:**
  - `HeroSearch.tsx`: Uma barra grande, chamativa, com suporte a blur de fundo elegante, posicionada no centro da home.
- **Floating Action Menu (FAM):**
  - `FloatingConcierge.tsx`: Um menu fixo na lateral inferior, oferecendo pesquisa rápida e acesso direto à "Ana" de forma contínua em qualquer página. Abertura do overlay de busca.
- **Search Overlay & Lead Capture:**
  - `SearchOverlay.tsx`: Os resultados aparecem com "chips" de categorias.
  - Se os resultados forem vazios, um formulário magnético (botão animado, copy acolhedor) capta o interesse do usuário oferecendo "Falar com nosso time de IA".

---

## Task Breakdown (task.md sync)

### Fase 1: Fundação do Vector DB
- [ ] Mapear Supabase e criar Script SQL p/ habilitar `pgvector` e criar a coluna `embedding`. (Agent: `backend-specialist`)
- [ ] Criar Postgres RPC Function para Busca Híbrida (combina textsearch com `cosine distance`). (Agent: `backend-specialist`)

### Fase 2: Embedding Generation (Agente Julia)
- [ ] Obter chave do Gemini e configurar utilitário `/lib/ai/gemini.ts`. (Agent: `backend-specialist`)
- [ ] Interceptar salvamento no `/admin` para gerar vetores com `text-embedding-004`. (Agent: `backend-specialist`)
- [ ] Rodar um script de backfill para gerar embedings dos posts atuais (se houver). (Agent: `backend-specialist`)

### Fase 3: Frontend e "Ana" (Agente Ana)
- [ ] Criar Server Action ou Endpoint `/api/search` que chama a RPC do Supabase. (Agent: `backend-specialist` / `frontend-specialist`)
- [ ] Criar o componente `FloatingConcierge` (FAM) persistente (no `layout.tsx`). (Agent: `frontend-specialist`)
- [ ] Refatorar a Hero para um modelo "Search-First" usando `HeroSearch.tsx`. (Agent: `frontend-specialist`)
- [ ] Desenhar Interface de Resultados (Chips de Categoria + Fallback de Captação de Lead). (Agent: `frontend-specialist`)

---

## User Review Required

> [!WARNING]
> Vamos utilizar o painel do Supabase diretamente para executar as migrações SQL ou devemos construir isso como arquivos locais (`supabase/migrations`) para rodar via CLI?
> O modelo `text-embedding-004` (Gemini) requer uma API Key em `.env.local` (ex: `GEMINI_API_KEY`). Precisarei de uma chave de homologação para os testes.

## Phase X: Verificação
- Segurança: Checar vazamento de API keys no bundle público.
- Performance: O FAM e o Search não podem travar a main thread (usar Debounce e Loading states Skeletons).
- Lighthouse: Auditar LCP da Home com a nova Hero.
