import {test, expect } from 'playwright/test'
import { Search } from "../Page-Object/Search.page"

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
    await page.goto('https://localhost:44336/')
    const search = new Search(page)
    await search.searchWithKeyWord('')
    search.verifyWhenNoProduct
})