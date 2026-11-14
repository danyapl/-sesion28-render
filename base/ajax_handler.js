"use strict";

// Usar el mismo servidor donde esta publicada la pagina.
const usersUrl = "/api/users/";

async function loadUsers(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

function storeUser(url, user, onSuccess, onError) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    getXhrResponse(xhr, onSuccess, onError);
  };

  xhr.onerror = () => {
    onError("No se pudo conectar con el servidor.");
  };

  xhr.send(JSON.stringify(user));
}

function putUser(url, user, onSuccess, onError) {
  const xhr = new XMLHttpRequest();

  xhr.open("PUT", url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = () => {
    getXhrResponse(xhr, onSuccess, onError);
  };

  xhr.onerror = () => {
    onError("No se pudo conectar con el servidor.");
  };

  xhr.send(JSON.stringify(user));
}

function deleteUser(url, onSuccess, onError) {
  const xhr = new XMLHttpRequest();

  xhr.open("DELETE", url);

  xhr.onload = () => {
    getXhrResponse(xhr, onSuccess, onError);
  };

  xhr.onerror = () => {
    onError("No se pudo conectar con el servidor.");
  };

  xhr.send();
}

function getXhrResponse(xhr, onSuccess, onError) {
  if (xhr.status >= 200 && xhr.status < 300) {
    onSuccess(xhr.responseText);
  } else {
    onError(
      xhr.responseText || "Error del servidor: " + xhr.status
    );
  }
}
