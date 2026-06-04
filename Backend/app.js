const express = require("express");
const path = require("path");

const app = express();
const frontendPath = path.resolve(__dirname, "../Frontend");

console.log(" Sirviendo estáticos desde:", frontendPath);

app.use(express.json());
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});

// Memoria temporal
let usuarios = [];
let ofertas = [];
let citas = [];

// Registro
app.post("/registro", (req, res) => {
  const { nombre, correo, password, role } = req.body;
  if (!correo || !password) {
    return res.status(400).json({ success: false, error: "Faltan campos obligatorios" });
  }
  usuarios.push({ nombre, correo, password, role });
  res.status(200).json({ success: true, message: "Usuario registrado correctamente" });
});

// Login
app.post("/login", (req, res) => {
  const { correo, password } = req.body;
  const usuario = usuarios.find(u => u.correo === correo && u.password === password);
  if (usuario) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false });
});

// Ofertas
app.get("/ofertas", (req, res) => {
  res.status(200).json(ofertas);
});

app.post("/ofertas", (req, res) => {
  const { nombre, especialidad, precio } = req.body;
  if (!nombre || !especialidad || precio == null || precio < 0) {
    return res.status(400).json({ error: "Datos inválidos en oferta" });
  }
  ofertas.push(req.body);
  res.status(200).json({ message: "Oferta creada correctamente" });
});

// Citas
app.get("/citas", (req, res) => {
  res.status(200).json(citas);
});

app.post("/citas", (req, res) => {
  const { cliente, servicio, fecha } = req.body;
  if (!cliente || !servicio || !fecha || isNaN(Date.parse(fecha))) {
    return res.status(400).json({ error: "Datos inválidos en cita" });
  }
  citas.push(req.body);
  res.status(200).json({ message: "Cita creada correctamente" });
});

module.exports = app;
