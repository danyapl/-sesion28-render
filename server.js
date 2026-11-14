"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./controllers/router");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
  ]
}));

app.use(express.json());

app.use("/api/users", router);

// Mostrar la pagina y sus archivos desde el mismo servidor.
app.use(express.static(path.join(__dirname, "base")));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "base", "user_admin.html")
  );
});

app.listen(port, "0.0.0.0", () => {
  console.log("Servidor iniciado en el puerto " + port);
});
