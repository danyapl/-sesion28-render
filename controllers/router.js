"use strict";

const express = require("express");
const router = express.Router();
const dataHandler = require("./data_handler");

router.get("/", (req, res) => {
  res.json(dataHandler.getUsers());
});

router.post("/", (req, res) => {
  const user = req.body;

  if (!user.firstName || !user.lastName || !user.email) {
    return res.status(400).send("Faltan nombre, apellido o correo.");
  }

  if (dataHandler.getUserByEmail(user.email)) {
    return res.status(409).send("Ese correo ya esta registrado.");
  }

  dataHandler.createUser(user);
  res.status(201).send("Usuario creado correctamente.");
});

router.get("/:email", (req, res) => {
  const user = dataHandler.getUserByEmail(req.params.email);

  if (!user) {
    return res.status(404).send("Usuario no encontrado.");
  }

  res.json(user);
});

router.put("/:email", (req, res) => {
  const user = dataHandler.updateUser(
    req.params.email,
    req.body
  );

  if (!user) {
    return res.status(404).send("Usuario no encontrado.");
  }

  res.send("Usuario actualizado correctamente.");
});

router.delete("/:email", (req, res) => {
  const user = dataHandler.deleteUser(req.params.email);

  if (!user) {
    return res.status(404).send("Usuario no encontrado.");
  }

  res.send("Usuario eliminado correctamente.");
});

module.exports = router;
