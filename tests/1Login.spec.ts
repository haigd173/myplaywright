import {test, expect } from 'playwright/test'
import { LoginPage } from '../Page-Object/Login.Page'
import * as  account from "../data/Login.json";


test.beforeEach('click icon', async({page})=>{

  await page.goto('https://localhost:44336/')
  await page.waitForSelector('.hero-slider-bg')
})
test.describe('Login succesfully', async () =>{ 
  
  test('Login succesfully with login button', async({page})=>{
    const login = new LoginPage(page)
    await login.loginWithEmailPassword(account.correctAccount.email,account.correctAccount.password)
    
  })

   test('Login succesfully with press Enter', async({page})=>{
    const login = new LoginPage(page)
    await login.ClickLoginNavigation()
    await login.EnterEmail(account.correctAccount.email)
    await login.EnterPassword(account.correctAccount.password)
    await page.keyboard.press('Enter')
    await login.CheckNotificationWhenLoginSuccessfully()
  })
 
})

test.describe('Check message when Login failed with incorrect account info', async () =>{ 
  test('Login failed with incorrect password', async({page})=>{
    const login = new LoginPage(page)
    await login.ClickLoginNavigation()
    await login.EnterEmail(account.accountWithIncorrectPassword.email)
    await login.EnterPassword(account.accountWithIncorrectPassword.password)
    await login.ClickLoginButton()
    await login.CheckNotificationWhenLoginWithIncorectEmailOrPassword()
  })
  test('Login failed with incorrect Email', async({page})=>{
    const login = new LoginPage(page)
    await login.ClickLoginNavigation()
    await login.EnterEmail(account.accountWithIncorrectEmail.email)
    await login.EnterPassword(account.accountWithIncorrectEmail.password)
    await login.ClickLoginButton()
    await login.CheckNotificationWhenLoginWithIncorectEmailOrPassword()
  })
  test('Login failed with empty/blank password', async({page})=>{
    const login = new LoginPage(page)
    await login.ClickLoginNavigation()
    await login.EnterEmail(account.correctAccount.email)
    await login.EnterPassword("")
    await login.ClickLoginButton()
    await login.CheckMessageWhenEmptyPassword()
  })
  test('Login failed with empty/blank Email', async({page})=>{
    const login = new LoginPage(page)
    await login.ClickLoginNavigation()
    await login.EnterEmail("")
    await login.EnterPassword(account.correctAccount.password)
    await login.ClickLoginButton()
    await login.CheckMessageWhenEmptyEmail()
  })
  
  test('Login failed with empty/blank Email and password', async({page})=>{
    const login = new LoginPage(page)
    await login.ClickLoginNavigation()
    await login.EnterEmail("")
    await login.EnterPassword("")
    await login.ClickLoginButton()
    await login.CheckMessageWhenEmptyEmail()
    await login.CheckMessageWhenEmptyPassword()
    })


})
