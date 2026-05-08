export function parseUrlEncoded(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      console.log(chunk);

      body += chunk.toString();
      console.log(body);
    });

    req.on("end", () => {
      try {
        const params = new URLSearchParams(body);
        console.log(params);

        const result = Object.fromEntries(params); // Convierte a objeto JS
        console.log(result);

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });

    req.on("error", (err) => reject(err));
  });
}
