const request = require('supertest');
const app = require('../app'); 

describe('Gestión de Citas', () => {
  test('Listar citas devuelve arreglo', async () => {
    const response = await request(app).get('/citas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Crear cita válida', async () => {
    const nuevaCita = { 
      cliente: 'Abi', 
      profesional: 'Juan', 
      servicio: 'Spa', 
      fecha: '2026-06-05', 
      hora: '10:00', 
      precio: 100, 
      estado: 'pendiente' 
    };
    const response = await request(app).post('/citas').send(nuevaCita);
    expect(response.statusCode).toBe(200); 
    expect(response.body.message).toBe('Cita creada correctamente');
  });

  //  Pruebas negativas para subir cobertura
  test("Debe devolver error si la fecha es inválida", async () => {
    const res = await request(app).post("/citas").send({
      cliente: "Juan Pérez",
      profesional: "María López",
      servicio: "Manicure",
      fecha: "fecha-invalida",
      hora: "10:00"
    });
    expect(res.statusCode).toBe(400);
  });

  test("Debe devolver error si falta cliente en la cita", async () => {
    const res = await request(app).post("/citas").send({
      profesional: "María López",
      servicio: "Manicure",
      fecha: "2026-06-05",
      hora: "10:00"
    });
    expect(res.statusCode).toBe(400);
  });

  test("Debe devolver error si falta servicio en la cita", async () => {
    const res = await request(app).post("/citas").send({
      cliente: "Juan Pérez",
      profesional: "María López",
      fecha: "2026-06-05",
      hora: "10:00"
    });
    expect(res.statusCode).toBe(400);
  });
});


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

afterAll(async () => {
  await pool.end(); // cierra la conexión a la BD
});
