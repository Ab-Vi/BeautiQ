require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL en Railway
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Servir archivos estáticos desde la carpeta Frontend
app.use(express.static(path.join(__dirname, "../Fronted")));

// Ruta raíz: devuelve index.html por defecto
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Fronted/index.html"));
});

// ------------------- USUARIOS -------------------

// Registro de usuario
app.post("/registro", async (req, res) => {
  const { nombre, correo, telefono, password, role } = req.body;
  try {
    await pool.query(
      'INSERT INTO usuarios (nombre, correo, telefono, password, role) VALUES ($1, $2, $3, $4, $5)',
      [nombre, correo, telefono, password, role]
    );
    res.json({ success: true, message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ success: false, message: "Error en el registro" });
  }
});

// Login de usuario
app.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1 AND password = $2',
      [correo, password]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, message: "Login exitoso" });
    } else {
      res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ success: false, message: "Error en el login" });
  }
});

// ------------------- OFERTAS -------------------

// Crear oferta
app.post("/ofertas", async (req, res) => {
  try {
    const { nombre, especialidad, ubicacion, reseñas, precio, descripcion, disponibilidad, servicios, foto } = req.body;
    const result = await pool.query(
      `INSERT INTO ofertas (nombre, especialidad, ubicacion, reseñas, precio, descripcion, disponibilidad, servicios, foto, creado)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()) RETURNING *`,
      [nombre, especialidad, ubicacion, reseñas, precio, descripcion, disponibilidad, servicios, foto]
    );
    res.json({ message: "Oferta creada correctamente", oferta: result.rows[0] });
  } catch (err) {
    console.error("Error al crear oferta:", err);
    res.status(500).json({ message: "Error al crear la oferta" });
  }
});

// Listar ofertas
app.get("/ofertas", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ofertas ORDER BY creado DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener ofertas:", err);
    res.status(500).json({ message: "Error al obtener ofertas" });
  }
});

// ------------------- PUERTO -------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

