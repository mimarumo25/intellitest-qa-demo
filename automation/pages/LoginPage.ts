import type {Locator, Page} from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', {name: 'Username'});
    this.passwordInput = page.getByRole('textbox', {name: 'Password'});
    this.signInButton = page.getByRole('button', {name: 'Sign In', exact: true});
  }

  async open(baseUrl: string, loginPath: string): Promise<void> {
    await this.page.goto(new URL(loginPath, baseUrl).toString());
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  textInPage(text: string): Locator {
    return this.page.getByText(text, {exact: true});
  }
}
