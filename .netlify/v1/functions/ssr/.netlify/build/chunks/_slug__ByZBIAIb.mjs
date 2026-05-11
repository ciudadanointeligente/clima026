import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import nodemailer from 'nodemailer';
import { marked } from 'marked';

const prerender = false;
function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("Frontmatter no encontrado");
  const [, yaml, body] = match;
  const data = {};
  for (const line of yaml.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"') || val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: body.trim() };
}
const POST = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug requerido" }), { status: 400 });
  }
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM) {
    return new Response(JSON.stringify({ error: "SMTP no configurado en variables de entorno" }), { status: 500 });
  }
  const filePath = resolve(process.cwd(), "src/content/alertas", `${slug}.mdoc`);
  let text;
  try {
    text = readFileSync(filePath, "utf-8");
  } catch {
    return new Response(JSON.stringify({ error: `Alerta "${slug}" no encontrada` }), { status: 404 });
  }
  let data, body;
  try {
    ({ data, body } = parseFrontmatter(text));
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
  const { titulo, mensaje, url, destinatarios } = data;
  if (!destinatarios) {
    return new Response(JSON.stringify({ error: "La alerta no tiene destinatarios" }), { status: 400 });
  }
  const to = destinatarios.split(",").map((e) => e.trim()).filter(Boolean);
  const subject = `[Alerta] ${titulo}`;
  const htmlBody = marked.parse(body || mensaje || "");
  const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
<h1 style="color:#1e40af;margin-bottom:8px">${titulo}</h1>
<p style="color:#475569;font-size:16px;margin-bottom:16px">${mensaje || ""}</p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
<div style="color:#334155;font-size:15px;line-height:1.6">${htmlBody}</div>
${url ? `<p style="margin-top:16px"><a href="${url}" style="display:inline-block;background:#1e40af;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">Ver más</a></p>` : ""}
</div>`;
  const textPlain = `${titulo}

${mensaje || ""}

${body || ""}${url ? `

${url}` : ""}`;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to: to.join(", "),
      subject,
      text: textPlain,
      html
    });
    return new Response(JSON.stringify({
      success: true,
      messageId: info.messageId,
      to: to.length,
      subject
    }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
