import {test} from '../fixtures/test';
import {createBdd} from 'playwright-bdd';
import {expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import data from '../data/login.json';
import session from '../data/session.json';

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

Given('el usuario ha iniciado sesión con credenciales válidas y el encabezado Dashboard está visible', async ({page}) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const {username, password} = validCredentials();
  expect(username, 'TEST_USERNAME debe estar configurado como secreto del proyecto').not.toBe('');
  expect(password, 'TEST_PASSWORD debe estar configurado como secreto del proyecto').not.toBe('');
  await login.open(targetUrl(), data.loginPath);
  await login.login(username, password);
  await expect(dashboard.heading).toBeVisible();
  await expect(dashboard.heading).toHaveText(data.dashboardHeading);
});

When('el usuario recarga la página', async ({page}) => {
  const dashboard = new DashboardPage(page);
  await dashboard.reload();
});

Then('el encabezado Dashboard sigue visible', async ({page}) => {
  const dashboard = new DashboardPage(page);
  await expect(dashboard.heading).toBeVisible();
  await expect(dashboard.heading).toHaveText(data.dashboardHeading);
});

Then('el texto Login to your account no aparece en la página', async ({page}) => {
  const login = new LoginPage(page);
  await expect(login.textInPage(session.loginText)).toHaveCount(0);
});
