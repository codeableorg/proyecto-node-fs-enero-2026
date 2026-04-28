import { readFile } from "node:fs/promises";
import { createServer } from "node:http";

const html = `
    <!doctype html>
    <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vanilla Node Web Server</title>
      </head>
      <body>
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
              <img src="/node-mascot.svg" alt="Mascota de Node.js" width="120" />
              <figcaption>Mascota de Node.js</figcaption>
            </figure>
          </section>
      </body>
    </html>
  `;

async function requestListener(req, res) {
  const { url } = req;

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  if (url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (url === "/api/time") {
    const date = new Date();
    const time = date.toISOString();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ time: time }));
  }

  if (url === "/node-mascot.svg") {
    try {
      const data = await readFile("node-mascot.svg");
      // Es clave enviar el Content-Type correcto para que el navegador sepa qué hacer con los datos
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      return res.end(data);
    } catch {
      res.writeHead(404);
      return res.end();
    }
  }
}

const server = createServer(requestListener);
server.listen(3000);
