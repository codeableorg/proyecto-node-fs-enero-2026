import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { staticHandler } from "./handlers/staticHandlers.js";
import { getContact, getHome, postContact } from "./handlers/viewHandlers.js";

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
    return await postContact(req, res);
  }

  // Rutas de Vistas
  if (pathname === "/") {
    return await getHome(req, res);
  }

  // Fallback: Archivos Estáticos
  return await staticHandler(req, res, pathname);
}
