import {test , expect, Locator} from 'playwright/test'
import {Base} from '../Page-Object/Base.page'




export class ChangePassword extends Base  {

    
   // change password page
   private curentPassword : Locator
   private newPassword: Locator
   private confirmPassword : Locator
   private saveButton : Locator
   // message
   private messageOnCurentPassword : Locator
   private messageOnNewPassword : Locator
   private messageOnConfirmPassword : Locator
   //Notification
   private notificationPopup : Locator
   private notificationMessage : Locator
    
    
    constructor(page){
        super(page)

        this.curentPassword = page.locator('#OldPassword')
        this.newPassword = page.locator('#NewPassword')
        this.confirmPassword =page.locator('#PasswordConfirm')
        this.saveButton = page.getByRole('button', {name:(" Lưu ")})
        //message
         this.messageOnCurentPassword = page.locator('#OldPassword-error')
        this.messageOnNewPassword = page.locator('#NewPassword-error')
        
        this.messageOnConfirmPassword =page.locator('#PasswordConfirm-error')
        //notification
        this.notificationPopup = page.locator('.swal2-popup.swal2-toast.swal2-show')
        this.notificationMessage  = page.locator('#swal2-title')
    }


    public async clickOnAccountManage() {
        await this.page.locator('.main-menu.menu-color--black.menu-hover-color--golden li').nth(6).click()   
    } 
    //
    public async clickOnChangePasswordInAccountInfo() {
        await this.clickOnAccountManage()
        await this.page.locator('.dashboard_tab_button.aos-init.aos-animate li').nth(2).click()
    }
    public async enterCurentPassword (curentPassword : string){
       await this.curentPassword.fill(curentPassword)
    }
    public async enterNewPassword ( newPassword : string ){
        await this.newPassword.fill(newPassword)
    }
    public async enterConfirmPassword ( confirmPassword : string ){
        await this.confirmPassword.fill(confirmPassword)
    }
    public async clickOnSaveButton ( ){
        await this.saveButton.click()
    }
    // Expected CurentPassword Message
    public async verifyCurentPasswordMessage(expectMessage : string){
       const actualMessage = await this.messageOnCurentPassword.textContent()
       expect(actualMessage).toEqual(expectMessage)
       expect(await this.messageOnCurentPassword).toBeVisible()
      
    }
    // Expected NewPassword Message
    public async verifyNewPasswordMessage(expectMessage : string){
       const actualMessage = await this.messageOnNewPassword.textContent()
       expect(actualMessage).toEqual(expectMessage)
       expect(await this.messageOnNewPassword).toBeVisible()
       await this.page.waitForTimeout(500)
    }
    //Expected ConfirmPassword Message
    public async verifyConfirmPasswordMessage(expectMessage : string){
       const actualMessage = await this.messageOnConfirmPassword.textContent()
       expect(actualMessage).toEqual(expectMessage)
       expect(await this.messageOnConfirmPassword).toBeVisible()
    }
    // UI
    public async verifyUiOfChangePassWordPage(){
        const curentPasswordLabel = this.page.locator('label:has-text("Mật khẩu cũ")')
        const newPasswordLabel = this.page.locator('label:has-text("Mật khẩu mới")')
        const confirmPasswordLabel = this.page.locator('label:has-text("Mật khẩu xác nhận")')
            expect(curentPasswordLabel).toBeVisible()
            expect(newPasswordLabel).toBeVisible()
            expect(confirmPasswordLabel).toBeVisible()
            expect(await this.curentPassword).toBeVisible()
            expect(await this.newPassword).toBeVisible()
            expect(await this.confirmPassword).toBeVisible()
            expect(await this.saveButton).toBeVisible() 
            await this.page.waitForTimeout(1000)                         
    }

    async VerifyNotification(message : string){
        expect(await this.notificationPopup).toBeVisible()
        await expect(this.notificationMessage).toHaveText(message)
        
    }
    // reset password after run test change password successfuly
    public async ChangePasswordSuccessfulyAndResetPasswordAndVerifyNotification (curentpassword: string, newpassword : string){
        await this.enterCurentPassword(curentpassword)
        await this.enterNewPassword(newpassword)
        await this.enterConfirmPassword(newpassword)
        await this.clickOnSaveButton()
        await this.notificationMessage.waitFor()
        await this.VerifyNotification('Đổi mật khẩu thành công')
        await this.enterCurentPassword(newpassword)
        await this.enterNewPassword(curentpassword)
        await this.enterConfirmPassword(curentpassword)
        await this.clickOnSaveButton()    
    }
}