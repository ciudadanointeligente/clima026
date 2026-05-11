#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const USAGE = `Uso: node scripts/enviar-alerta.mjs <slug>

Variables de entorno requeridas:
  SMTP_HOST     Servidor SMTP (ej: smtp.gmail.com)
  SMTP_PORT     Puerto SMTP (ej: 587)
  SMTP_USER     Usuario SMTP
  SMTP_PASS     Contraseña SMTP
  EMAIL_FROM    Dirección de origen (ej: alertas@ejemplo.com)

Ejemplo:
  SMTP_HOST=smtp.gmail.com SMTP_PORT=587 \\
  SMTP_USER=tu@email.com SMTP_PASS=tu_password \\
  EMAIL_FROM=alertas@dominio.com \\
  node scripts/enviar-alerta.mjs mi-alerta
`;

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Formato de archivo inválido: no se encontró frontmatter');
  const [, yaml, body] = match;
  const data = {};
  for (const line of yaml.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }
  return { data, body: body.trim() };
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error(USAGE);
    process.exit(1);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM) {
    console.error(USAGE);
    process.exit(1);
  }

  const filePath = resolve(root, 'src/content/alertas', `${slug}.mdoc`);

  let text;
  try {
    text = readFileSync(filePath, 'utf-8');
  } catch {
    console.error(`Error: No se encontró la alerta "${slug}" en src/content/alertas/${slug}.mdoc`);
    process.exit(1);
  }

  const { data, body } = parseFrontmatter(text);
  const { titulo, mensaje, url, destinatarios } = data;

  if (!destinatarios) {
    console.error('Error: La alerta no tiene destinatarios configurados');
    process.exit(1);
  }

  const to = destinatarios.split(',').map(e => e.trim()).filter(Boolean);
  const subject = `[Alerta] ${titulo}`;
  const htmlBody = marked(body || mensaje || '');
  const html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
<h1 style="color:#1e40af;margin-bottom:8px">${titulo}</h1>
<p style="color:#475569;font-size:16px;margin-bottom:16px">${mensaje || ''}</p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
<div style="color:#334155;font-size:15px;line-height:1.6">${htmlBody}</div>
${url ? `<p style="margin-top:16px"><a href="${url}" style="display:inline-block;background:#1e40af;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">Ver más</a></p>` : ''}
</div>`;

  const textPlain = `${titulo}\n\n${mensaje || ''}\n\n${body || ''}${url ? `\n\n${url}` : ''}`;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: to.join(', '),
    subject,
    text: textPlain,
    html,
  });

  console.log(`✓ Alerta enviada a ${to.length} destinatario(s)`);
  console.log(`  Asunto: ${subject}`);
  console.log(`  ID del mensaje: ${info.messageId}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
