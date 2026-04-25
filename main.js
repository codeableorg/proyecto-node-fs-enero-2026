// import { readFileSync, readFile } from 'node:fs';
import { readFile } from "node:fs/promises";

import { createServer } from "node:http";

const server = createServer(async (req, res) => {
  const { method, url } = req;

  // Ruta home
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hola mundo este es el home");
    return;
  }

  // Ruta de la api
  if (method === "GET" && url === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Respuesta en JSON desde la api",
        code: 200,
        status: "ok",
      }),
    );
    return;
  }

  if (method === "GET" && url === "/archivo") {
    console.log("Leyendo el archivo...");

    try {
      const promise1 = readFile("text.txt", "utf-8");
      console.log(promise1);

      const promise2 = readFile("text1.txt", "utf-8");

      console.log(promise2);

      const result = await Promise.race([promise1, promise2]);
      // let data;
      // for (const promise of results) {
      //   if (promise.status === 'fulfilled') {
      //     data = promise.value;
      //     console.log(data);

      //     break;
      //   }
      // }

      if (result) {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(result);
      } else {
        res.writeHead(204);
        res.end();
      }

      return;
    } catch (error) {
      console.error(error);

      res.end("Algo malo pasó");
      return;
    }
  }

  // Ruta de health
  if (method === "GET" && url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Respuesta en JSON desde health",
        code: 200,
        status: "ok",
      }),
    );
    return;
  }

  res.end("Hola mundo");
});

// const listen = (server, port) => {
//   return new Promise((resolve, reject) => {
//     server.listen(port, () => resolve('Todo fue bien'));
//   });
// };

// listen(server, 3000)
//   .then((mensaje) => {
//     console.log(mensaje);
//   })
//   .catch(() => {});

const message = await new Promise((resolve) =>
  server.listen(3000, () => resolve("Servidor encendido")),
);

console.log(message);

// server.listen(3000, () => {
//   console.log('El servidor va bien');
// });
