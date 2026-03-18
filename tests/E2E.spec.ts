import {test, expect } from 'playwright/test'
import { Search } from "../Page-Object/Search.page"
import { LoginPage } from '../Page-Object/Login.Page'
import * as  account from "../data/Login.json";


// test('TC_E2E: Verify that ', async ({page})=>{ 
//     await page.goto('https://localhost:44336/hp-pavilion-15-eg0507tu-i5-1135g78gb256gbwin10-46m06pa-11')
//     const tonkho = await page.locator('.product-stock').textContent()
//     const quantityInput = page.getByRole('spinbutton')

// // Cách 1: Nhập trực tiếp số lượng mong muốn
//    await quantityInput.fill('100');
//    await quantityInput.press('ArrowUp'); 

//     for(let i = 0;i<10 ; i++){
//     await quantityInput.press('ArrowUp'); 
//     }
//     console.log('tonkho', tonkho)
// })
test.skip('Checkout main successfully', async ({page})=>{
    // Login
    const login = new LoginPage(page)
    await login.loginWithEmailPassword(account.correctAccount.email,account.correctAccount.password)
    // Add product to cart
    // Change quanlity
    // fill Oder Address
    // Checkout successfully
})
