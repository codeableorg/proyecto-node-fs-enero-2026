import { sendHtml } from "../utils/response.js";
import { getLayout } from "../utils/html.js";

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

export async function getHome(_req, res) {
  const pagina = getLayout("Inicio", home);
  sendHtml(res, pagina);
}
