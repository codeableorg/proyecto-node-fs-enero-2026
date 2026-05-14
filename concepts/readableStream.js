import fs from "node:fs";

const stream = fs.createReadStream("archivo.txt");

stream.on("open", () => {
  console.log("Stream abierto");
});

stream.on("data", (chunk) => {
  console.log("Chunk recibido", chunk.length, "bytes");
});

stream.on("end", () => {
  console.log("Lectura completada");
});

stream.on("error", (err) => {
  console.error("Error:", err.message);
});
