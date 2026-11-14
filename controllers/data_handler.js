"use strict";

const fs = require("fs");
const path = require("path");
const User = require("./user");

const filePath = path.join(__dirname, "../data/users.json");

let users = JSON.parse(
  fs.readFileSync(filePath, "utf8")
).map(User.generateUser);

function saveUsers() {
  fs.writeFileSync(
    filePath,
    JSON.stringify(users, null, 2)
  );
}

function getUsers() {
  return users;
}

function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

function createUser(data) {
  if (getUserByEmail(data.email)) {
    return;
  }

  const user = User.generateUser(data);
  users.push(user);
  saveUsers();

  return user;
}

function updateUser(email, updatedUser) {
  const user = getUserByEmail(email);

  if (!user) {
    return;
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "password",
    "date",
    "sex",
    "image"
  ];

  for (const field of allowedFields) {
    if (updatedUser[field] !== undefined) {
      user[field] = updatedUser[field];
    }
  }

  saveUsers();
  return user;
}

function deleteUser(email) {
  const index = users.findIndex(
    user => user.email === email
  );

  if (index === -1) {
    return;
  }

  const user = users.splice(index, 1)[0];
  saveUsers();

  return user;
}

module.exports = {
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};
