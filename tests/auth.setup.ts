import { test as setup } from '@playwright/test'
import user from '../.auth/user.json'
import fs from 'fs'

const authFile = '.auth/user.json'
// cách 1: xác thực bằng đăng nhập trên UI
// setup('authentication', async ({page})=>{           
//  await page.goto('https://conduit.bondaracademy.com/')
//   await page.getByText("Sign in").click()     
//   await page.getByPlaceholder('Email').fill("tester123@gmail.com")
//   await page.getByPlaceholder('Password').fill("123456")
//   await page.getByRole('button',{name:"Sign in"}).click()

//   await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')
//   await page.context().storageState({path: authFile})
// })

// cách 2 : xác thực bằng Post API
// setup('authentication', async ({request})=>{
//  const Authenticationreponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
//     data : {
//       "user" : {email: "tester123@gmail.com", password : "123456"}    
//     }
//   })
//   const AuthenticationreponseBody = await Authenticationreponse.json()
//   const accessToken = await AuthenticationreponseBody.user.token
//   user.origins[0].localStorage[0].value= accessToken
//   fs.writeFileSync(authFile, JSON.stringify(user))

//   process.env['ACCESS_TOKEN'] =  accessToken

// })