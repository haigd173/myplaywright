import {test, expect } from 'playwright/test'
import { Search } from "../Page-Object/Search.page"
import { LoginPage } from '../Page-Object/Login.Page'
import { Cart } from '../Page-Object/Cart.page'
import * as  account from "../data/Login.json";

// test('click icon', async({page})=>{
//   const search = new Search(page)
//   await page.goto('https://localhost:44336/')
//   await page.locator('.header-action-link.action-color--black.action-hover-color--golden').locator('li').nth(1).click()
//   await page.getByPlaceholder('Nhập thông tin tại đây').fill('gaming')
//   await page.getByRole('button', {name :("Tìm Kiếm")}).click()
  

//   const listTitle = await page.locator('#layout-3-grid').locator('h6').allTextContents()
//   console.log(listTitle)
//   listTitle.forEach(title =>{
//     expect(title).toContain('Gaming')
//   })
// })
test('TC_9: Verify the product list is not display any products when searches with keyword does not exist.', async ({page})=>{ 
    await page.goto('https://localhost:44336/login')
     const login = new LoginPage(page)
     const cart = new Cart(page)
    await login.loginWithEmailPassword(account.correctAccount.email,account.correctAccount.password)
    await page.waitForTimeout(500)
    // await page.evaluate(() => window.scrollTo(0, 300));
    await page.locator('.image-box').nth(1).hover()
    await page.waitForTimeout(500)
    await page.locator('.btnAddToCart').nth(1).click()
    await page.goto('https://localhost:44336/cart')
    await page.waitForTimeout(500)
    const Itemtable = await page.locator('tbody')
    Itemtable.locator('.js-delete')  //.nth(number) for only item
    const src = await Itemtable.locator('img').getAttribute('src')
    const name = await Itemtable.locator('.product_name').textContent()    
    for (let i = 0; i<5;i++){
        await Itemtable.locator('.fa.fa-plus').click()
        await page.waitForTimeout(100)
    }   
    await Itemtable.locator('.fa.fa-minus').click()
    const inputquantity = await Itemtable.locator('input').inputValue()
    const totalprice = await Itemtable.locator('.product_total').textContent()

    console.log(`Thông tin: ${name} Data: ${src} Tổng giá: ${totalprice} Số lượng: ${inputquantity}`)
})
