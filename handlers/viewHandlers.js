import { sendHtml, sendHtmlError } from "../utils/response.js";

import { getLayout } from "../utils/html.js";
import { parseUrlEncoded } from "../utils/bodyParser.js";
import path from "node:path";
import fs from "node:fs/promises";

const home = `
    <h1>Bienvenido a Vanilla Node Web Server</h1>
    <section>
      <h2>Prueba la API</h2>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/api/time">/api/time</a></li>
      </ul>
    </section>
    <section>
      <h2>Conoce a la mascota</h2>
      <figure>
        <img src="node-mascot.svg" alt="Mascota de Node.js" width="120" />
        <figcaption>Mascota de Node.js</figcaption>
      </figure>
    </section>
  `;

const contact = `
    <section>
      <h2>Formulario de Contacto</h2>
      <form action="/contact" method="POST">
        <div>
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="message">Mensaje:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </section>
  `;

export async function getHome(_req, res) {
  const pagina = getLayout("Inicio", home);
  sendHtml(res, pagina);
}

export async function getContact(_req, res) {
  const pagina = getLayout("Nuevo Contacto", contact);
  sendHtml(res, pagina);
}

const DATA_DIR = path.join(import.meta.dirname, "../data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

export async function postContact(req, res) {
  let body;
  try {
    body = await parseUrlEncoded(req);
  } catch {
    return sendHtmlError(res, "Error interno del servidor");
  }
  const { name, email, message } = body;

  console.log(name, email, message);

  if (!name || !email || !message) {
    return sendHtmlError(res, "Faltan campos requeridos", 400);
  }

  let messages = [];
  // Intentamos leer los mensajes existentes del archivo JSON.
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf-8");
    console.log(data);
    console.log("----------------------");

    messages = JSON.parse(data);
    console.log(messages);
  } catch (error) {
    console.log(error);

    if (error.code === "ENOENT") {
      // Si el archivo no existe, solo nos aseguramos de que el directorio
      // data existe para la futura escritura (messages ya se inicializó como `[]`)
      await fs.mkdir(DATA_DIR, { recursive: true });
    } else {
      // Cualquier otro error se trata como un error de servidor.
      const status = 500; // Internal Server Error
      res.writeHead(status);
      return res.end();
    }
  }

  messages.push({
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  });

  const dataToWrite = JSON.stringify(messages, null, 2);
  console.log(dataToWrite);
  await fs.writeFile(MESSAGES_FILE, dataToWrite);

  console.log("Aqui estamos");

  res.writeHead(200);
  res.end("Recibiendo tu mensaje");
  return;
}
