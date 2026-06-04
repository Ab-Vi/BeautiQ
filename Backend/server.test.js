const request = require("supertest");
const app = require("../app.js"); 

describe("Servidor básico", () => {
  test("Responde en la ruta raíz", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/<!DOCTYPE html>/);
  });

  test("Sirve archivos estáticos (ejemplo citas.html)", async () => {
    const res = await request(app).get("/citas.html");
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/<html>/);
  });

  test("Debe devolver 404 en ruta inexistente", async () => {
    const res = await request(app).get("/ruta-que-no-existe");
    expect(res.statusCode).toBe(404);
  });
});
