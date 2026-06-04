const { test, expect } = require('@playwright/test');

test('Crear y listar oferta E2E', async ({ page }) => {
  await page.goto('http://localhost:4000');

  // Crear oferta
  await page.fill('#nombreOferta', 'Promo Spa');
  await page.fill('#descripcionOferta', '20% descuento');
  await page.fill('#precioOferta', '100');
  await page.click('#btnCrearOferta');

  // Verificar que aparece en la lista
  await page.click('#btnListarOfertas');
  await expect(page.locator('#listaOfertas')).toContainText('Promo Spa');
});
