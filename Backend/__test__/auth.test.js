const request = require('supertest');
const app = require('../app');


describe('Autenticación de usuarios', () => {
  test('Registro de usuario válido', async () => {
    const nuevoUsuario = { 
      nombre: 'Abi', 
      correo: 'abi@test.com', 
      telefono: '123456789', 
      password: '123456', 
      role: 'cliente' 
    };
    const response = await request(app).post('/registro').send(nuevoUsuario);
    expect(response.statusCode).toBe(200); 
    expect(response.body.success).toBe(true);
  });

  test('Login con credenciales correctas', async () => {
    const login = { correo: 'abi@test.com', password: '123456' };
    const response = await request(app).post('/login').send(login);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('Login con credenciales incorrectas', async () => {
    const login = { correo: 'abi@test.com', password: 'wrong' };
    const response = await request(app).post('/login').send(login);
    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });
});

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

afterAll(async () => {
  await pool.end();
});


