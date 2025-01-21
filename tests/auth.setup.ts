import { test as setup } from '@playwright/test'

const authFile = '.auth/user.json'

setup('authentication', async ({page})=>{
 await page.goto('https://conduit.bondaracademy.com/')
  await page.getByText("Sign in").click()     
  await page.getByPlaceholder('Email').fill("tester123@gmail.com")
  await page.getByPlaceholder('Password').fill("123456")
  await page.getByRole('button',{name:"Sign in"}).click()

  await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
  await page.context().storageState({path: authFile})
})