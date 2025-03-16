import { expect, Page } from 'playwright/test';
import { Base } from './Base.page'


export class LoginPage extends Base {

    constructor( page: Page){    
        super(page)
    }

    async loginWithEmailPassword (email : string, password : string) {
       await this.ClickLoginNavigation()
       await this.EnterEmail(email)
       await this.EnterPassword(password)
       await this.ClickLoginButton()
    //    await this.page.getByRole('navigation').getByRole('link', { name: 'Đăng nhập' }).click()
    //    await this.page.locator('#Email').clear()
    //    await this.page.locator('#Email').fill(email)
    //    await this.page.locator('#Password').clear()
    //    await this.page.locator('#Password').fill(password)
    //    await this.page.getByRole('button', {name :("ĐĂNG NHẬP")}).click()
    //    await this.page.waitForTimeout(2000)
       
    }
    async EnterPassword (password : string){
      
       await this.page.locator('#Password').clear()
       await this.page.locator('#Password').fill(password)

    }
    async EnterEmail (email: string){
        await this.page.locator('#Email').clear()
       await this.page.locator('#Email').fill(email)
    }

    async ClickLoginButton (){
        await this.page.getByRole('button', {name :("ĐĂNG NHẬP")}).click()
    }

    async ClickLoginNavigation (){
        await this.page.getByRole('navigation').getByRole('link', { name: 'Đăng nhập' }).click()
        await this.page.waitForTimeout(500)
    }

    async NavigateToLoginPage (){
        await this.page.goto('https://localhost:44336/login')
    }
    
    async CheckNotificationWhenLoginSuccessfully (){
        const checkmessage = await this.page.locator('#swal2-title').textContent()
        expect(checkmessage).toContain('Đăng nhập thành công')
    }

    async CheckNotificationWhenLoginWithIncorectEmailOrPassword (){
        const checkmessage = await this.page.locator('#swal2-title').textContent()
        expect(checkmessage).toContain('Email, mật khẩu không đúng, hoặc tài khoản bị vô hiệu hóa')
    }

    async CheckNotificationWhenLoginWithDisableAccount (){
        const checkmessage = await this.page.locator('#swal2-title').textContent()
        expect(checkmessage).toContain('Email, mật khẩu không đúng, hoặc tài khoản bị vô hiệu hóa')
    }

     async CheckMessageWhenEmptyEmail (){
        const checkmessage = await this.page.locator('#Email-error').textContent()
        expect(checkmessage).toContain('Nhập Email')
    }
    
     async CheckMessageWhenEmptyPassword (){
        const checkmessage = await this.page.locator('#Password-error').textContent()
        expect(checkmessage).toContain('Nhập mật khẩu')
    }
    
    // async NavigateToUrl(url : string) {
    //    const loginUrl = `${url}/login` 
    //    super.NavigateToUrl(loginUrl)
    //    const checktitle = await this.page.getByTitle('#hadc').textContent()
    //    expect(checktitle).toContain("Đăng nhập")
    // }

}

