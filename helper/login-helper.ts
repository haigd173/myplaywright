import { Page } from '@playwright/test';
import { LoginPage } from '../Page-Object/Login.Page';
import * as  account from "../data/Login.json";


export  async function loginBeforeEach(page: Page) {
  await page.goto('https://localhost:44336/');
  const loginPage = new LoginPage(page);
  await loginPage.loginWithEmailPassword(account.correctAccount.email,account.correctAccount.password)
  
  await page.waitForSelector('.hero-slider-bg')
}

// lưu session