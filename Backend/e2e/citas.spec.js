const { test, expect } = require('@playwright/test');

test('Agendar y listar cita E2E', async ({ page }) => {
  await page.goto('http://localhost:4000');

  // Crear cita
  await page.fill('#cliente', 'Abi');
  await page.fill('#profesional', 'Carlos');
  await page.fill('#servicio', 'Spa');
  await page.fill('#fecha', '2026-06-05');
  await page.fill('#hora', '10:00');
  await page.click('#btnCrearCita');

  await page.click('#btnListarCitas');
  await expect(page.locator('#listaCitas')).toContainText('Abi');
});
