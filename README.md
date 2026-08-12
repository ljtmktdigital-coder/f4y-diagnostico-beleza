# Diagnóstico Estratégico F4Y — Exclusivo Beleza & Estética

Versão v2: segue a ordem e as perguntas exatas do formulário de referência, com Mercado, Tipo de negócio, E-mail e Atendimentos/mês como campos novos.

## O que tem aqui

```
public/index.html   -> a página do formulário
api/submit.js        -> função que recebe a resposta e cria a página no Notion
```

## ⚠ Se você já tinha a database da v1 criada

Ela precisa de 4 colunas novas e 2 colunas alteradas de tipo. Abra a database no Notion e:

**Adicionar (colunas novas):**
| Coluna | Tipo | Opções (se for Select) |
|---|---|---|
| Mercado | Select | Brasil, Portugal |
| Tipo de negócio | Select | Salão de Beleza, Centro Estético, Outro |
| E-mail | Text | — |
| Atendimentos/mês | Text | — |

**Alterar o tipo (clique no cabeçalho da coluna → Edit property → Type):**
| Coluna | Tipo antigo | Tipo novo |
|---|---|---|
| Origem das clientes | Text | Multi-select (opções: Indicação, Orgânico, Google, Anúncios, Sistema de agendamento) |
| Agendamento/recompra → renomear para **Agendamento** | Text | Multi-select (opções: WhatsApp, Sistema de agendamento, Direct Instagram, Telefone) |

O `api/submit.js` já está escrito esperando esses nomes e tipos exatos — se o nome de alguma coluna no Notion ficar diferente (acento, maiúscula, espaço), o envio vai falhar com erro 502.

## Se você ainda não criou a database, crie do zero com estas colunas

| Coluna | Tipo |
|---|---|
| Nome | Title |
| Negócio | Text |
| Mercado | Select (Brasil, Portugal) |
| Contato | Text |
| E-mail | Text |
| Links | Text |
| Tipo de negócio | Select (Salão de Beleza, Centro Estético, Outro) |
| Faturamento | Select |
| Já investe em tráfego | Select |
| Verba atual | Text |
| Quem cuida do marketing | Select |
| Objetivo 90 dias | Text |
| Urgência | Number |
| Serviços/ticket | Text |
| Origem das clientes | Multi-select (Indicação, Orgânico, Google, Anúncios, Sistema de agendamento) |
| Atendimentos/mês | Text |
| No-show | Text |
| Agendamento | Multi-select (WhatsApp, Sistema de agendamento, Direct Instagram, Telefone) |
| Performance de premium | Text |
| Experiência com agência | Text |
| Verba disponível | Text |
| Observação livre | Text |
| Vertical | Select (Beleza/Estética) |
| Status | Select (crie pelo menos "Novo - não triado") |

## Publicar / atualizar no Vercel

1. Suba os arquivos atualizados (`public/index.html` e `api/submit.js`) no mesmo repositório do GitHub, substituindo os antigos — abra cada arquivo lá no GitHub, clique no lápis (editar), apague tudo, cole o conteúdo novo, "Commit changes".
2. A Vercel redeploya sozinha assim que detecta o commit novo (leva menos de 1 minuto).
3. As variáveis de ambiente (`NOTION_TOKEN`, `NOTION_DATABASE_ID`) continuam as mesmas — não precisa mexer nelas.

## Testar

Preencha o formulário publicado até o fim, envie, e confira se a linha nova apareceu na database com todos os campos (inclusive os multi-select) preenchidos certo.
