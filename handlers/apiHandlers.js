import { sendJson } from "../utils/response.js";

export async function getHealth(req, res) {
  sendJson(res, { status: "ok" });
}

export async function getTime(req, res) {
  const date = new Date();
  const time = date.toISOString();
  sendJson(res, { time });
}
