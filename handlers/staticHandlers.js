import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";
import { HttpError } from "../utils/errors.js";

// La ruta se resuelve relativa al Directorio de Trabajo Actual (CWD)
const PUBLIC_DIR = path.resolve("public");

export async function staticHandler(_req, res, pathname) {
  try {
    // Se asume riesgo de Directory Traversal
    const filePath = path.join(PUBLIC_DIR, pathname);

    const stats = await fs.promises.stat(filePath);

    if (!stats.isFile()) {
      throw new HttpError("Recurso no encontrado", 404);
    }

    // Intentar deducir el tipo MIME, fallback a binario genérico
    const mimeType = mime.lookup(filePath) || "application/octet-stream";

    // Escribir la cabecera y enviar el archivo
    res.writeHead(200, { "Content-Type": mimeType });

    const readStream = fs.createReadStream(filePath);

    readStream.pipe(res);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      throw new HttpError("Recurso no encontrado", 404);
    } else if (error.code === "EACCES") {
      throw new HttpError("Acceso denegado", 403);
    }

    throw error;
  }
}
