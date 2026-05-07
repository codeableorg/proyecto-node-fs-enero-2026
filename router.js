import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { staticHandler } from "./handlers/staticHandlers.js";
import { getContact, getHome } from "./handlers/viewHandlers.js";

export async function router(req, res) {
  const { url: pathname, method } = req;

  // Rutas de API
  if (pathname === "/api/health") {
    return await getHealth(req, res);
  }

  if (pathname === "/api/time") {
    return await getTime(req, res);
  }

  if (pathname === "/contact" && method === "GET") {
    return await getContact(req, res);
  }

  if (pathname === "/contact" && method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      console.log(chunk);

      // Los chunks llegan como Buffer (bytes), los convertimos a string
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log("Cuerpo recibido:", body);
      // Salida típica: name=Juan&email=juan@mail.com&message=Hola
    });

    // Por ahora, sólo probamos que el router funciona
    res.writeHead(200);
    return res.end("Recibiendo tu mensaje...");
  }

  // Rutas de Vistas
  if (pathname === "/") {
    return await getHome(req, res);
  }

  // Fallback: Archivos Estáticos
  return await staticHandler(req, res, pathname);
}
