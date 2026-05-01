import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { sendHtml, sendJson } from "./utils/response.js";
import { getLayout } from "./utils/html.js";
import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { getHome } from "./handlers/viewHandlers.js";

const contact = "<h1>Escríbenos</h1>";

async function requestListener(req, res) {
  const { url } = req;

  if (url === "/") {
    getHome(req, res);
    return;
  }

  if (url === "/contact") {
    const pagina = getLayout("Contacto", contact);
    sendHtml(res, pagina);
    return;
  }

  if (url === "/api/health") {
    getHealth(req, res);
    return;
  }

  if (url === "/api/time") {
    getTime(req, res);
  }

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
      sendJson(res, { error: "No encontrado" }, 404);
      return;
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

  res.writeHead(404);
  res.end();
  return;
}

const server = createServer(requestListener);
server.listen(3000);
