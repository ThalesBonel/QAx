// @ts-check
import { test, expect } from "@playwright/test";

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  //Buscar por role
  await page.getByRole("button", { name: /Aperte o play/ }).click();

  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText("Fila de espera");

  /*   //Buscar por ID
  await page.locator("#name").fill("Thales Testes"); */

  /*   //Buscar por Name
  await page.locator("input[name=name]").fill("Thales Testes"); */

  /* //Buscar por locator -> Placeholder
  await page.locator('input[placeholder="Seu nome completo"]').fill("Thales Testes"); */

  //Buscar por Placeholder DIRETO
  await page.getByPlaceholder("Seu nome completo").fill("Thales Testes");

  await page.getByPlaceholder("Seu email principal").fill("thales@tests.com.br");

  /*   await page.getByRole("button", { name: "Quero entrar na fila!" }).click(); */

  //Outra opção de pegar o button
  await page.getByTestId("modal").getByText("Quero entrar na fila!").click();

  // Estratégia para buscar um toast que aparece RÁPIDO em tela para validação
  /*   await page.getByText("seus dados conosco.").click();

  const content = await page.content();
  console.log(content); */

  const toastMessage = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await expect(page.locator(".toast")).toHaveText(toastMessage);

  await expect(page.locator(".toast")).toBeHidden({ timeout: 5000 });
});
