import fs from "node:fs";

const source = fs.createReadStream("archivo.txt");
const destination = fs.createWriteStream("copia.txt");

source.pipe(destination);
