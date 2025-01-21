import {test, expect } from 'playwright/test'
test('click icon', async({page})=>{
  await page.goto('https://plusbase-auto.onshopbase.com/products/test-product-earth-projector-photography-lamp')

  await page.locator('.flex.flex-column.w-100.h-100.block-search').click()
})
// test('product name', async({page})=>{
//   await page.goto('https://plusbase-auto.onshopbase.com/products/test-product-earth-projector-photography-lamp')

//   await page.locator('[value="product.title"]').click()  //atribute

// })
// test('product price', async({page})=>{
//   await page.goto('https://plusbase-auto.onshopbase.com/products/test-product-earth-projector-photography-lamp')

//    const testprice = page.locator('[data-block-id="UYeKWq"]').locator('span')
//    const GiaGoc = await testprice.nth(1).textContent()
//    const Giasaukhigiam = await testprice.nth(0).textContent()
//    const disccout = await testprice.nth(2).textContent()

//    expect(GiaGoc).toContain('$16.89')
//    expect(Giasaukhigiam).toContain('$12.99')
//    expect(disccout).toContain('23% off')


// })


