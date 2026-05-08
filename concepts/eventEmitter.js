import EventEmitter from "node:events";

const emitter = new EventEmitter();

function createUser(userData) {
  const user = saveUserToDatabase(userData);
  emitter.emit("userCreated1", user);

  return user;
}

emitter.on("userCreated", (user) => {
  sendWelcomeEmail(user);
});

emitter.on("userCreated1", (user) => {
  console.log("esto es una prueba");
});

function saveUserToDatabase(userData) {
  console.log("Usuario creado en base de datos");
  return userData;
}

function sendWelcomeEmail(user) {
  console.log(`Enviando email de confirmación al usuario ${user.name}`);
}

const user = { name: "carlos", edad: 31 };

createUser(user);
