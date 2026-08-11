// /api/submit — recebe o POST do formulário (exclusivo Beleza/Estética) e cria uma página no Notion.
// Roda como Vercel Serverless Function (Node.js runtime), sem servidor pra manter.
//
// Variáveis de ambiente necessárias (configurar no painel do Vercel, nunca no código):
//   NOTION_TOKEN        -> token secreto da sua integração interna do Notion
//   NOTION_DATABASE_ID  -> ID da database "Respostas · Diagnóstico F4Y · Beleza"
//
// Como criar (uma vez só):
//   1. https://www.notion.so/my-integrations -> "New integration" -> copiar o "Internal Integration Secret"
//   2. Criar uma database no Notion com as propriedades listadas no README
//   3. Na database, clicar em "..." -> "Connections" -> conectar a integração criada
//   4. Copiar o ID da database (parte da URL entre a barra e o "?v=")

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

  const notionPayload = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      // Ajuste os nomes das propriedades abaixo para baterem exatamente com
      // os nomes das colunas criadas na sua database do Notion.
      'Nome': { title: [{ text: { content: d.nome || 'Sem nome' } }] },
      'Negócio': { rich_text: richText(d.negocio) },
      'Cidade/País': { rich_text: richText(d.cidade_pais) },
      'Contato': { rich_text: richText(d.contato) },
      'Links': { rich_text: richText(d.links) },
      'Faturamento': { select: { name: d.faturamento || 'não informado' } },
      'Já investe em tráfego': { select: { name: d.investe_trafego || 'não informado' } },
      'Verba atual': { rich_text: richText(d.verba_atual) },
      'Quem cuida do marketing': { select: { name: d.quem_cuida || 'não informado' } },
      'Objetivo 90 dias': { rich_text: richText(d.objetivo_90dias) },
      'Urgência': { number: parseInt(d.urgencia, 10) || null },
      'Serviços/ticket': { rich_text: richText(d.servicos_ticket) },
      'Origem das clientes': { rich_text: richText(d.origem_clientes) },
      'No-show': { rich_text: richText(d.noshow) },
      'Agendamento/recompra': { rich_text: richText(d.agendamento) },
      'Performance de premium': { rich_text: richText(d.premium_performance) },
      'Experiência com agência': { rich_text: richText(d.experiencia_agencia) },
      'Verba disponível': { rich_text: richText(d.verba_disponivel) },
      'Observação livre': { rich_text: richText(d.observacao_livre) },
      'Vertical': { select: { name: 'Beleza/Estética' } },
      'Status': { select: { name: 'Novo — não triado' } },
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
