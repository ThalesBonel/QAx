import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login-page.js';
import { MoviesPage } from '../pages/movies-page.js';
import { Toast } from '../pages/components.js';

let toast;
let moviesPage;
let loginPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    moviesPage = new MoviesPage(page);
    toast = new Toast(page);
})


test('Deve logar como administrador', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
}) 


test('Não deve logar com senha errada', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'batata')

    const toastMessage = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
    await toast.containText(toastMessage);
});

// email nao preenchido
test('Não deve logar sem preencher campo E-mail', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('', 'pwd123')
    await loginPage.alertHaveText('Campo obrigatório')
})

//senha não preenchida
test('Não deve logar sem preencher campo Senha', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', '')
    await loginPage.alertHaveText('Campo obrigatório')
})

// formato de email incorreto
test('Não deve logar com campo Email em formato incorreto', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('www.thales.com.br', 'pwd123')
    await loginPage.alertHaveText('Email incorreto')
})

test('Não deve logar sem preencher nenhum campo', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('', '')
    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})