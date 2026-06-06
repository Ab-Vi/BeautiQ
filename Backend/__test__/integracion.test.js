// __test__/integracion.test.js
const request = require('supertest');
const app = require('../app');


describe('Pruebas de integración', () => {
  test('Registro + Login', async () => {
    const nuevoUsuario = { nombre: 'Abi', correo: 'abi@test.com', password: '123456', role: 'cliente' };
    await request(app).post('/registro').send(nuevoUsuario);
    const login = { correo: 'abi@test.com', password: '123456' };
    const response = await request(app).post('/login').send(login);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

 test('Crear oferta + Listar ofertas', async () => {
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

  await request(app).post('/ofertas').send(nuevaOferta);
  const response = await request(app).get('/ofertas');
  expect(response.statusCode).toBe(200);
  expect(response.body.some(o => o.nombre === 'Promo Spa')).toBe(true);
});


  test('Crear cita + Listar citas', async () => {
    const nuevaCita = { cliente: 'Abi', profesional: 'Juan', servicio: 'Spa', fecha: '2026-06-05', hora: '10:00', precio: 100, estado: 'pendiente' };
    await request(app).post('/citas').send(nuevaCita);
    const response = await request(app).get('/citas');
    expect(response.statusCode).toBe(200);
    expect(response.body.some(c => c.cliente === 'Abi')).toBe(true);
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
