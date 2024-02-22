const users = require('../data/users');

function generateUserId() {
  return new Date().getTime().toString();
}

async function createUser(username, email, password) {
  const userId = generateUserId();
  const userData = {
    id: userId,
    username: username,
    email: email,
    password: password,
  };
  users.push(userData);
  return userData;
}

async function getUserByUsernameAndPassword(username, password) {
  return users.find(u => u.username === username && u.password === password);
}

async function getAllUsers() {
  return users;
}

async function getUserById(userId) {
  return users.find(user => user.id === userId);
}

async function updateUser(userId, username, password, email) {
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    users[userIndex].username = username || users[userIndex].username;
    users[userIndex].password = password || users[userIndex].password;
    users[userIndex].email = email || users[userIndex].email;

    return users[userIndex];
  } else {
    return null;
  }
}

async function deleteUser(userId) {
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    return { message: `User ${userId} deleted successfully`, deletedUser };
  } else {
    return null;
  }
}

module.exports = {
  createUser,
  getUserByUsernameAndPassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
