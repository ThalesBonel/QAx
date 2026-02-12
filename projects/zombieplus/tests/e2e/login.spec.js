import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login-page.js';
import { Toast } from '../pages/components.js';

let toast;
let loginPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
})


test('Deve logar como administrador', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()
}) 


test('Não deve logar com senha errada', async ({page}) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'batata')

    const toastMessage = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.";
    await toast.haveText(toastMessage);
});



// refatorar teste lead.spec