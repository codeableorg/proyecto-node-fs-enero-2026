function createUser(userData) {
  const user = saveUserToDatabase(userData);

  sendWelcomeEmail(user);
  return user;
}

function saveUserToDatabase(userData) {
  console.log("Usuario creado en base de datos");
  return userData;
}

function sendWelcomeEmail(user) {
  console.log(`Enviando email de confirmación al usuario ${user.name}`);
}

const user = { name: "carlos", edad: 31 };

createUser(user);
