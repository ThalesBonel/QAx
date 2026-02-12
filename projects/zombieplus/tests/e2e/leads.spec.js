// @ts-nocheck
import { test } from "@playwright/test";
import { LandingPage } from "../pages/landing-page.js";
import { Toast } from '../pages/components.js';

let landingPage;
let toast;


test.beforeEach(async ({page}) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
})

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Thales Bonel', 'thales@teste.com');

  const toastMessage ="Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await toast.haveText(toastMessage);
});

test("Não deve cadastrar com email inválido", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Thales Bonel', 'thales.teste.com');

  await landingPage.alertHaveText('Email incorreto')
});

test("Não deve cadastrar com nome em branco", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'thales@teste.com');
  await landingPage.alertHaveText("Campo obrigatório")  
});

test("Não deve cadastrar com email em branco", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('Thales Bonel', '');

  await landingPage.alertHaveText("Campo obrigatório")  
});


test("Não deve cadastrar com nome E email em branco", async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');

  await landingPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"])
});