import {test, expect  } from 'playwright/test'

test('TC_12: Verify that the CI run successfully', async({page})=>{
    await page.goto('https://www.youtube.com/')
    await page.waitForTimeout(7000)
    await expect(page).toHaveTitle('YouTube')
    
})