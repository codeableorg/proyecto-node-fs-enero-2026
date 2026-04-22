import { createServer } from 'node:http';

const server = createServer((req, res) => {
  console.log(req);

  res.end('Hola mundo');
});

server.listen(3000, () => {
  console.log('El servidor va bien');
});
