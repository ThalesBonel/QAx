// @ts-nocheck
import { expect, request, test } from "@playwright/test";
import { LandingPage } from "../pages/landing-page.js";
import { Toast } from '../pages/components.js';
import { faker } from '@faker-js/faker';

let landingPage;
let toast;


test.beforeEach(async ({page}) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
})

test("Deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const toastMessage ="Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await toast.containText(toastMessage);
});


test("Não deve cadastrar um lead quando o email já existe", async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads',  {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.status()).toBe(201);
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const toastMessage ="O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await toast.containText(toastMessage);
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