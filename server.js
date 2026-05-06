import { createServer } from "node:http";
import { getHealth, getTime } from "./handlers/apiHandlers.js";
import { getContact, getHome } from "./handlers/viewHandlers.js";
import { staticHandler } from "./handlers/staticHandlers.js";

async function requestListener(req, res) {
  const { url } = req;

  if (url === "/") {
    getHome(req, res);
    return;
  }

  if (url === "/contact") {
    getContact(req, res);
    return;
  }

  if (url === "/api/health") {
    getHealth(req, res);
    return;
  }

  if (url === "/api/time") {
    getTime(req, res);
    return;
  }

  return await staticHandler(req, res, url);
}

const server = createServer(requestListener);
server.listen(3000);
