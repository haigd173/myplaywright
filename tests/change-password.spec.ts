import {test, expect } from 'playwright/test'
import { ChangePassword } from '../Page-Object/ChangePassword.page'
import {loginBeforeEach} from '../helper/login-helper'
import { LoginPage } from '../Page-Object/Login.Page'
import * as notificationAndMessage from "../data/ChangePasswordMessage.json"

 let changepassword : ChangePassword
test.beforeEach('login successfuly', async ({page})=>{
  const login = new LoginPage(page)
  changepassword = new ChangePassword(page)
  await login.NavigateToLoginPage()
  await login.loginWithEmailPassword('testchangepassword@gmail.com','Test123!')
  await changepassword.clickOnChangePasswordInAccountInfo() 
    await page.waitForURL('https://localhost:44336/change_password')
})
test.describe('HAPPY CASE : change password successfuly ',  ()=>{
  test('TC_CP_1 : change password successfully ', async ({page})=>{
    await changepassword.ChangePasswordSuccessfulyAndResetPasswordAndVerifyNotification('Test123!','NewPass@123')
  })

  // fail testcase : password just limited 30 character 
  test('TC_CP_11 : Verify that user can change password with a 256-character long password.', async ({page})=>{
    await changepassword.ChangePasswordSuccessfulyAndResetPasswordAndVerifyNotification('Test123!','Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#')
  })

})
test('TC_CP_09 : Verify that all UI elements on the Change Password page are displayed correctly.', async ({page})=>{
  await changepassword.verifyUiOfChangePassWordPage()
})
test.describe('Navigate case', ()=>{
  test
})
    