import { sendHtml } from "../utils/response.js";
import { getLayout } from "../utils/html.js";
import { parseUrlEncoded } from "../utils/bodyParser.js";

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

export async function postContact(req, res) {
  const body = await parseUrlEncoded(req);
  const { name, email, message } = body;

  console.log(name, email, message);

  if (!name || !email || !message) {
    res.writeHead(400); // 400 Bad Request
    return res.end();
  }

  res.writeHead(200);
  return res.end("Recibiendo tu mensaje...");
}
