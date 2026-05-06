import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { staticHandler } from "./handlers/staticHandlers.js";
import { getContact, getHome } from "./handlers/viewHandlers.js";

export async function router(req, res) {
  const { url: pathname } = req;

  // Rutas de API
  if (pathname === "/api/health") {
    return await getHealth(req, res);
  }

  if (pathname === "/api/time") {
    return await getTime(req, res);
  }

  if (pathname === "/contact") {
    getContact(req, res);
    return;
  }

  // Rutas de Vistas
  if (pathname === "/") {
    return await getHome(req, res);
  }

  // Fallback: Archivos Estáticos
  return await staticHandler(req, res, pathname);
}
