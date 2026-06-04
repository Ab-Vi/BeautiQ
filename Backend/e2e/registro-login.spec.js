const { test, expect } = require('@playwright/test');

test.setTimeout(60000); // aumentar tiempo de espera

test('Registro y login E2E', async ({ page }) => {
  // Registro
  await page.goto('http://localhost:4000/registro.html');
  await page.fill('#nombre', 'Abi');
  await page.fill('#correo', 'abi@test.com');
  await page.fill('#telefono', '123456789');
  await page.fill('#password', '123456');
  await page.click('#btnRegistro');
  await expect(page.locator('#mensajeRegistro')).toContainText('Usuario registrado correctamente');

  // Login
  await page.goto('http://localhost:4000/index.html');
  await page.fill('#email', 'abi@test.com');
  await page.fill('#password', '123456');
  await page.click('.btn-beautiq'); // botón de login
  await expect(page).toHaveURL(/menu\.html|admin\.html/);
});
