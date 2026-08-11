# Diagnóstico Estratégico F4Y — Exclusivo Beleza & Estética

Versão dedicada ao nicho de Beleza/Estética: sem bifurcação de vertical, prova social (Be You) já no topo, e o bloco 3 é fixo com as 5 perguntas de beleza.

## O que tem aqui

```
public/index.html   -> a página do formulário
api/submit.js        -> função que recebe a resposta e cria a página no Notion
```

## Passo a passo pra colocar no ar

### 1. Criar a database no Notion

Crie uma database chamada, por exemplo, **"Respostas · Diagnóstico F4Y · Beleza"**, com estas colunas (nome tem que bater com o `api/submit.js`):

| Coluna | Tipo |
|---|---|
| Nome | Title |
| Negócio | Text |
| Cidade/País | Text |
| Contato | Text |
| Links | Text |
| Faturamento | Select |
| Já investe em tráfego | Select |
| Verba atual | Text |
| Quem cuida do marketing | Select |
| Objetivo 90 dias | Text |
| Urgência | Number |
| Serviços/ticket | Text |
| Origem das clientes | Text |
| No-show | Text |
| Agendamento/recompra | Text |
| Performance de premium | Text |
| Experiência com agência | Text |
| Verba disponível | Text |
| Observação livre | Text |
| Vertical | Select (`Beleza/Estética`) |
| Status | Select (crie `Novo — não triado`) |

### 2. Criar a integração do Notion (token)

1. **notion.so/my-integrations** → *New integration* → nome "F4Y Intake Beleza".
2. Copie o **Internal Integration Secret**.
3. Na database criada → **"..."** → **Connections** → conecte a integração.
4. Copie o **ID da database** (32 caracteres na URL, entre a última `/` e o `?v=`).

### 3. Publicar no Vercel

1. Conta grátis em **vercel.com**.
2. Suba esta pasta num repositório GitHub (ou arraste direto na Vercel).
3. **New Project** → **Environment Variables**:
   - `NOTION_TOKEN` = secret do passo 2
   - `NOTION_DATABASE_ID` = ID do passo 2
4. Deploy. Depois é só apontar um domínio seu se quiser (ex: `diagnostico.find4you.com.br`).

### 4. Testar

Preencha até o fim e confira se a linha apareceu na database com Status "Novo — não triado".

## Depois de publicado

- É este link — não o WhatsApp direto — que vai em qualquer copy/anúncio de captação pra Beleza/Estética.
- Rotina de triagem: máx. 3 diagnósticos completos por semana, seguindo o playbook operacional já existente.
