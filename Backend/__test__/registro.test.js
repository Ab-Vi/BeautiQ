
const request = require("supertest");
const app = require("../app"); 

test("No debe registrar usuario sin correo", async () => {
  const res = await request(app).post("/registro").send({
    nombre: "Ana",
    telefono: "3001234567",
    password: "123456",
    role: "cliente"
  });
  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("error");
});
