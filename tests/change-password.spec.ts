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
test.describe('Happy Case : change password successfuly ',  ()=>{
  test('TC_CP_1 : change password successfully ', async ({page})=>{
    await changepassword.ChangePasswordSuccessfulyAndResetPasswordAndVerifyNotification('Test123!','NewPass@123')
  })

  // fail testcase : password just limited 30 character 
  test('TC_CP_11 : Verify that user can change password with a 256-character long password.', async ({})=>{
    await changepassword.ChangePasswordSuccessfulyAndResetPasswordAndVerifyNotification('Test123!','Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#')
  })

})
test('TC_CP_09 : Verify that all UI elements on the Change Password page are displayed correctly.', async ({})=>{
  await changepassword.verifyUiOfChangePassWordPage()
})
test.describe('Negative case:', ()=>{
  test('TC_CP_02 : Verify that change password fails if the new password is too short.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('Short')
  await changepassword.enterConfirmPassword('Short')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  test('TC_CP_03 : Verify that change password fails if the new password does not contain an uppercase letter.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('newpass@123')
  await changepassword.enterConfirmPassword('newpass@123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  test('TC_CP_04 : Verify that change password fails if the new password does not contain a lowercase letter.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('NEWPASS@123')
  await changepassword.enterConfirmPassword('NEWPASS@123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
 test('TC_CP_05 : Verify that change password fails if the new password does not contain a number.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('NewPass@abc')
  await changepassword.enterConfirmPassword('NewPass@abc')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  test('TC_CP_06 : Verify that change password fails if the new password does not contain a special character.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('NewPass123')
  await changepassword.enterConfirmPassword('NewPass123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  
  test('TC_CP_07 : Verify that change password fails if confirmation does not match the new password.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('NewPass@123')
  await changepassword.enterConfirmPassword('NewPass@1234')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyConfirmPasswordMessage(notificationAndMessage.Confirm.confirmPasswordNotMatchNewPassword)
})

 // Fail test -- password change when enter wrong old password
  test.skip('TC_CP_08 : Verify that change password fails if the current password is incorrect.', async ({})=>{
  await changepassword.enterCurentPassword('WrongPass')
  await changepassword.enterNewPassword('NewPass@123')
  await changepassword.enterConfirmPassword('NewPass@123')
  await changepassword.clickOnSaveButton()
  // await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  test('TC_CP_11 : Verify that change password fails if the new password exceeds 256 characters.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#2')
  await changepassword.enterConfirmPassword('Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#Abc123!@#2')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.LimitedNewPassword)
}) 
  //fail testcase -- password was change when new password same as old password.
  test.skip('TC_CP_12 : Verify that change password fails if the new password is the same as the old password.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('NewPass@123')
  await changepassword.enterConfirmPassword('NewPass@123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Notification.ChangePasswordFailWhenNewPasswordSameCurentPassword)
})
  test('TC_CP_13 : Verify that change password fails if the new password contains invalid characters.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('Pass with')
  await changepassword.enterConfirmPassword('Pass with')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})

  // Fail testcase : password was change when new pass word start with a space
  test.skip('TC_CP_14 : Verify that change password fails if the new password starts with a space.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword(' Pass@123')
  await changepassword.enterConfirmPassword(' Pass@123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  test('TC_CP_15 : Verify that change password fails if the new password ends with a space.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('Pass@123 ')
  await changepassword.enterConfirmPassword('Pass@123 ')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  test('TC_CP_16 : Verify that change password fails if the new password contains multiple spaces.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('Pass @ 123')
  await changepassword.enterConfirmPassword('Pass @ 123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})
  test('TC_CP_17 : Verify that change password fails if empty/blank old password.', async ({})=>{
  await changepassword.enterCurentPassword('')
  await changepassword.enterNewPassword('Pass@123')
  await changepassword.enterConfirmPassword('Pass@123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyCurentPasswordMessage(notificationAndMessage.Empty.CurentPassword)
}) 
  test('TC_CP_18 : Verify that change password fails if empty/blank new password.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('')
  await changepassword.enterConfirmPassword('Pass@123')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyConfirmPasswordMessage(notificationAndMessage.Empty.NewPassword)
}) 
  test('TC_CP_19 : Verify that change password fails if empty/blank confirm password.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('Pass@123')
  await changepassword.enterConfirmPassword('')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Empty.ConfirmPassword)
})
  test('TC_CP_20 : Verify that change password fails if new password contains Unicode hoặc emoji.', async ({})=>{
  await changepassword.enterCurentPassword('Test123!')
  await changepassword.enterNewPassword('NewPass@123😊')
  await changepassword.enterConfirmPassword('NewPass@123😊')
  await changepassword.clickOnSaveButton()
  await changepassword.verifyNewPasswordMessage(notificationAndMessage.Invalid.NewPassword)
})            
 

})
    