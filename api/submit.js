// /api/submit — recebe o POST do formulário (exclusivo Beleza/Estética) e cria uma página no Notion.
// Roda como Vercel Serverless Function (Node.js runtime), sem servidor pra manter.
//
// Variáveis de ambiente necessárias (configurar no painel do Vercel, nunca no código):
//   NOTION_TOKEN        -> token secreto da sua integração interna do Notion
//   NOTION_DATABASE_ID  -> ID da database "Respostas · Diagnóstico F4Y · Beleza"
//
// IMPORTANTE: a database no Notion precisa ter estas colunas EXATAS (nome e tipo),
// veja o README para o passo a passo de criação/atualização.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
    return res.status(500).json({ error: 'Servidor não configurado (faltam variáveis de ambiente Notion).' });
  }

  const d = req.body || {};
  const richText = (value) => [{ text: { content: (value || '-').toString().slice(0, 1900) } }];

  // Campos multi-select (checkbox) chegam como array quando há mais de 1 valor
  // marcado, ou como string única quando só 1 foi marcado. Normaliza pros dois casos.
  const toMultiSelect = (value) => {
    if (!value) return [];
    const arr = Array.isArray(value) ? value : [value];
    return arr.filter(Boolean).map((name) => ({ name }));
  };

  const notionPayload = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      'Nome': { title: [{ text: { content: d.nome || 'Sem nome' } }] },
      'Negócio': { rich_text: richText(d.negocio) },
      'Mercado': { select: { name: d.mercado || 'não informado' } },
      'Contato': { rich_text: richText(d.whatsapp) },
      'E-mail': { rich_text: richText(d.email) },
      'Links': { rich_text: richText(d.links) },
      'Tipo de negócio': { select: { name: d.tipo_negocio || 'não informado' } },
      'Faturamento': { select: { name: d.faturamento || 'não informado' } },
      'Já investe em tráfego': { select: { name: d.investe_trafego || 'não informado' } },
      'Verba atual': { rich_text: richText(d.verba_atual) },
      'Quem cuida do marketing': { select: { name: d.quem_cuida || 'não informado' } },
      'Objetivo 90 dias': { rich_text: richText(d.objetivo_90dias) },
      'Urgência': { number: parseInt(d.urgencia, 10) || null },
      'Serviços/ticket': { rich_text: richText(d.servicos_ticket) },
      'Origem das clientes': { multi_select: toMultiSelect(d.origem_clientes) },
      'Atendimentos/mês': { rich_text: richText(d.atendimentos_mes) },
      'No-show': { rich_text: richText(d.noshow) },
      'Agendamento': { multi_select: toMultiSelect(d.agendamento) },
      'Performance de premium': { rich_text: richText(d.premium_performance) },
      'Experiência com agência': { rich_text: richText(d.experiencia_agencia) },
      'Verba disponível': { rich_text: richText(d.verba_disponivel) },
      'Observação livre': { rich_text: richText(d.observacao_livre) },
      'Vertical': { select: { name: 'Beleza/Estética' } },
      'Status': { select: { name: 'Novo - não triado' } },
    },
  };

  try {
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notionPayload),
    });

    if (!notionRes.ok) {
      const errBody = await notionRes.text();
      console.error('Notion API error:', errBody);
      return res.status(502).json({ error: 'Falha ao gravar no Notion.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Submit handler error:', err);
    return res.status(500).json({ error: 'Erro interno.' });
  }
}
