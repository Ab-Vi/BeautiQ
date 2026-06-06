const request = require('supertest');
const app = require('../app'); 

describe('Gestión de Ofertas', () => {
  test('Crear oferta válida', async () => {
    const nuevaOferta = { 
      nombre: 'Promo Spa', 
      especialidad: 'Masajes', 
      ubicacion: 'Bogotá', 
      reseñas: '5 estrellas', 
      precio: 100, 
      descripcion: '20% descuento', 
      disponibilidad: 'Lunes a viernes', 
      servicios: 'Spa completo', 
      foto: 'imagen.jpg' 
    };
    const response = await request(app).post('/ofertas').send(nuevaOferta);
    expect(response.statusCode).toBe(200); 
    expect(response.body.message).toBe('Oferta creada correctamente');
  });

  test('Listar ofertas devuelve arreglo', async () => {
    const response = await request(app).get('/ofertas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("Debe devolver error si falta especialidad en oferta", async () => {
    const res = await request(app).post("/ofertas").send({
      nombre: "María López",
      precio: 50000
    });
    expect(res.statusCode).toBe(400);
  });

  test("Debe devolver error si falta nombre en oferta", async () => {
    const res = await request(app).post("/ofertas").send({
      especialidad: "Masajes",
      precio: 50000
    });
    expect(res.statusCode).toBe(400);
  });

  test("Debe devolver error si el precio es negativo", async () => {
    const res = await request(app).post("/ofertas").send({
      nombre: "María López",
      especialidad: "Masajes",
      precio: -100
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
