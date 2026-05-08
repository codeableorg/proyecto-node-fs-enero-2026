import { createServer } from "node:http";

import { router } from "./router.js";

async function requestListener(req, res) {
  router(req, res);
}

const server = createServer(requestListener);
server.listen(3000);

// process.on("", () => {
//   console.log("Apagando servidor");

//   server.close(() => {
//     console.log("Servidor cerrado correctamente");
//   });
// });
