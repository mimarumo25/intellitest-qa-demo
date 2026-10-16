import {test} from '../fixtures/test';
import {createBdd} from 'playwright-bdd';
import {expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import data from '../data/login.json';

const {Given, When, Then} = createBdd(test);

function targetUrl(): string {
  const value = process.env.TARGET_URL ?? '';
  if (value === '') {
    throw new Error('TARGET_URL debe estar configurado como variable de entorno del ambiente');
  }
  return value;
}

function validCredentials(): {username: string; password: string} {
  return {
    username: process.env.TEST_USERNAME ?? '',
    password: process.env.TEST_PASSWORD ?? '',
  };
}

Given('la página de acceso del ambiente configurado en TARGET_URL está abierta en el navegador', async ({page}) => {
  const login = new LoginPage(page);
  await login.open(targetUrl(), data.loginPath);
  await expect(login.usernameInput).toBeVisible();
});

Given('el formulario muestra los campos Username, Password y el botón Sign In', async ({page}) => {
  const login = new LoginPage(page);
  await expect(login.usernameInput).toBeVisible();
  await expect(login.passwordInput).toBeVisible();
  await expect(login.signInButton).toBeVisible();
});

Given('se dispone de credenciales válidas de prueba provistas como secretos del proyecto', async () => {
  const {username, password} = validCredentials();
  expect(username, 'TEST_USERNAME debe estar configurado como secreto del proyecto').not.toBe('');
  expect(password, 'TEST_PASSWORD debe estar configurado como secreto del proyecto').not.toBe('');
});

When('el usuario introduce esas credenciales válidas en Username y Password y pulsa Sign In', async ({page}) => {
  const login = new LoginPage(page);
  const {username, password} = validCredentials();
  await login.login(username, password);
});

Then('la aplicación abre la página raíz', async ({page}) => {
  await expect(page).toHaveURL((url) => url.pathname === data.rootPath);
});

Then('la página muestra el encabezado Dashboard', async ({page}) => {
  const dashboard = new DashboardPage(page);
  await expect(dashboard.heading).toHaveText(data.dashboardHeading);
});
