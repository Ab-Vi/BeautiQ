require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL en Railway 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor BeautiQ funcionando Correctamente");
});

// Registro de usuario
app.post("/registro", async (req, res) => {
  const { nombre, correo, telefono, password, role } = req.body;
  try {
    await pool.query(
      "INSERT INTO usuarios (nombre, correo, telefono, password, role) VALUES ($1, $2, $3, $4, $5)",
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
      "SELECT * FROM usuarios WHERE correo = $1 AND password = $2",
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

// Puerto dinámico para Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

