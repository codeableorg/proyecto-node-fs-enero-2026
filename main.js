import { createServer } from 'node:http';

const server = createServer((req, res) => {
  const { method, url } = req;

  // Ruta home
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('Hola mundo este es el home');
    return;
  }

  // Ruta de la api
  if (method === 'GET' && url === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Respuesta en JSON desde la api',
        code: 200,
        status: 'ok'
      })
    );
    return;
  }

  // Ruta de health
  if (method === 'GET' && url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Respuesta en JSON desde health',
        code: 200,
        status: 'ok'
      })
    );
    return;
  }

  res.end('Hola mundo');
});

// const listen = (server, port) => {
//   return new Promise((resolve, reject) => {
//     server.listen(port, () => resolve('Todo fue bien'));
//   });
// };

// listen(server, 3000).then((mensaje) => {
//   console.log(mensaje);
// });

await new Promise((resolve) => server.listen(3000, resolve));

// server.listen(3000, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('El servidor va bien');
// });
