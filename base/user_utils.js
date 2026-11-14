"use strict";

const userContainer = document.getElementById("userList");

function showStatus(message) {
  document.getElementById("status").textContent = message;
}

function userToHTML(user) {
  const card = document.createElement("article");
  card.className = "usuario";

  const image = document.createElement("img");
  image.alt = "Foto de " + user.firstName;

  if (user.image && /^https?:\/\//i.test(user.image)) {
    image.src = user.image;
  }

  const name = document.createElement("h2");
  name.textContent = user.firstName + " " + user.lastName;

  const email = document.createElement("p");
  email.textContent = "Correo: " + user.email;

  const date = document.createElement("p");
  date.textContent = "Fecha de nacimiento: " + user.date;

  const sex = document.createElement("p");
  sex.textContent = "Sexo: " + user.sex;

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "Editar";
  editButton.onclick = () => preloadEditModal(user.email);

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Eliminar";
  deleteButton.onclick = () => preloadDeleteModal(user.email);

  card.append(
    image, name, email, date, sex,
    editButton, deleteButton
  );

  return card;
}

function usersToHTML(users) {
  userContainer.replaceChildren();

  for (const user of users) {
    userContainer.appendChild(userToHTML(user));
  }

  if (users.length === 0) {
    userContainer.textContent = "No hay usuarios registrados.";
  }
}

async function preloadEditModal(email) {
  try {
    const user = await loadUsers(
      usersUrl + encodeURIComponent(email)
    );

    document.getElementById("emailEditModal").value = user.email;
    document.getElementById("firstName").value = user.firstName;
    document.getElementById("lastName").value = user.lastName;
    document.getElementById("userDate").value = user.date;
    document.getElementById("userSex").value =
      user.sex === "H" ? "H" : "M";
    document.getElementById("userUrl").value = user.image || "";

    document.getElementById("editModal").showModal();
  } catch (error) {
    showStatus(error.message);
  }
}

function preloadDeleteModal(email) {
  document.getElementById("emailDeleteModal").value = email;
  document.getElementById("deleteModal").showModal();
}

function editUser() {
  const email = document.getElementById("emailEditModal").value;

  const user = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    date: document.getElementById("userDate").value,
    sex: document.getElementById("userSex").value,
    image: document.getElementById("userUrl").value.trim()
  };

  if (!user.firstName || !user.lastName) {
    showStatus("Escribe el nombre y el apellido.");
    return;
  }

  putUser(
    usersUrl + encodeURIComponent(email),
    user,
    (message) => {
      document.getElementById("editModal").close();
      showStatus(message);
      displayUsers();
    },
    showStatus
  );
}

function removeUser() {
  const email = document.getElementById("emailDeleteModal").value;

  deleteUser(
    usersUrl + encodeURIComponent(email),
    (message) => {
      document.getElementById("deleteModal").close();
      showStatus(message);
      displayUsers();
    },
    showStatus
  );
}

document.getElementById("editForm").addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    editUser();
  }
);
