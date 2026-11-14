"use strict";

async function displayUsers() {
  try {
    const users = await loadUsers(usersUrl);
    usersToHTML(users);
  } catch (error) {
    showStatus("No se pudieron cargar los usuarios: " + error.message);
  }
}

const ximenaUser = {
  firstName: "Ximena",
  lastName: "Ruis",
  email: "ximena.ruiz@iteso.mx",
  password: "BestPassword2",
  date: "1997-08-08",
  sex: "M",
  image: "https://randomuser.me/api/portraits/women/25.jpg"
};

function addUser(user) {
  storeUser(
    usersUrl,
    user,
    (message) => {
      showStatus(message);
      displayUsers();
    },
    showStatus
  );
}

displayUsers();
