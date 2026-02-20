import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/login-page.js';
import { MoviesPage } from '../pages/movies-page.js';
import { Toast } from '../pages/components.js';
import  data  from '../support/fixtures/movies.json';
import { executeSQL } from '../support/database.js';

let toast;
let moviesPage;
let loginPage;

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    moviesPage = new MoviesPage(page);
    toast = new Toast(page);
})

//test para novo filme
test('Deve cadastrar um novo filme', async ({page}) => {

    const movie = data.create

    await executeSQL(`DELETE from movies where title = '${movie.title}' ;`)

    // é impotante estar logado 
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)
    
    await toast.containText('Cadastro realizado com sucesso!')
})


///try catch