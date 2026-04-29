import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

console.log("Probando");

const html = `
    <!doctype html>
    <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/styles.css" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
              <img src="node-mascot.svg" alt="Mascota de Node.js" width="120" />
              <figcaption>Mascota de Node.js</figcaption>
            </figure>
          </section>
      </body>
    </html>
  `;

const a = 2;
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

  // if (url === "/node-mascot.svg") {
  //   try {
  //     const data = await readFile("node-mascot.svg");
  //     // Es clave enviar el Content-Type correcto para que el navegador sepa qué hacer con los datos
  //     res.writeHead(200, { "Content-Type": "image/svg+xml" });
  //     return res.end(data);
  //   } catch {
  //     res.writeHead(404);
  //     return res.end();
  //   }
  // }

  const PUBLIC_DIR = resolve("public");
  // Asumimos el riesgo de un ataque 'Directory Traversal' por ahora
  const filePath = join(PUBLIC_DIR, url);
  const ext = extname(url).toLowerCase();

  if (ext === ".svg") {
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      return res.end(data);
    } catch {
      // Si el archivo no existe, simplemente respondemos 404
      res.writeHead(404);
      return res.end();
    }
  } else if (ext === ".css") {
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": "text/css" });
      return res.end(data);
    } catch {
      // Si el archivo no existe, simplemente respondemos 404
      res.writeHead(404);
      return res.end();
    }
  } else if (ext === ".ico") {
    try {
      const data = await readFile(filePath);
      res.writeHead(200, { "Content-Type": "image/x-icon" });
      return res.end(data);
    } catch {
      // Si el archivo no existe, simplemente respondemos 404
      res.writeHead(404);
      return res.end();
    }
  }
}

const server = createServer(requestListener);
server.listen(3000);
