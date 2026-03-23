import {test, expect  } from 'playwright/test'

test('TC_1: Verify that the CI run successfully', async({page})=>{
    await page.goto('https://www.youtube.com/')
    await page.waitForTimeout(7000)
    await expect(page).toHaveTitle('YouTube')  
})
test('TC_2: Failed', async({page})=>{
    await page.goto('https://www.youtube.com/')
    await page.waitForTimeout(7000)
    await expect(page).toHaveTitle('YouTube353454')  
})