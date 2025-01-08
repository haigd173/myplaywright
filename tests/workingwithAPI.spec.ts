import { expect, test } from 'playwright/test'
import tags from '../Data/tags.json'
import { request } from 'http';

test.beforeEach(async ({ page }) => {
  // mock api  
  await page.route('**/api/tags', async (route) => {   // chặn request lên Server = page.route
      await route.fulfill({
        //Đây là phương thức dùng để cung cấp một phản hồi tùy chỉnh cho một yêu cầu HTTP đã được chặn bằng route.
        body: JSON.stringify(tags), //body Thuộc tính này chỉ định nội dung của phản hồi HTTP. nội dung được định dạng dưới dạng chuỗi JSON.
       // stringify chuyển đổi một đối tượng JavaScript thành chuỗi JSON.
      });
    }
  )
  await page.goto('https://conduit.bondaracademy.com/')
  await page.getByText("Sign in").click()     
  await page.getByPlaceholder('Email').fill("tester123@gmail.com")
  await page.getByPlaceholder('Password').fill("123456")
  await page.getByRole('button',{name:"Sign in"}).click()

}); 
// test('check title', async ({ page }) => {
//   await page.route('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', async  (route) => {
//     const reponse = await route.fetch()
//     const reponseBody = await reponse.json()
//      reponseBody.articles[0].title = "this is my name DO CHI HAI "
//      reponseBody.articles[0].description =
//       " this is my name DO CHI HA this is my name DO CHI HAI this is my name DO CHI HAI"
//     await route.fulfill({
//       body: JSON.stringify(reponseBody)
//     })
//    })
//   await page.goto('https://conduit.bondaracademy.com/')
//   await page.waitForTimeout(2000);
//   await expect(page.locator('[class="navbar-brand"]')).toHaveText("conduit");
//   await expect(page.locator('app-article-preview h1').nth(0)).toHaveText('this is my name DO CHI HAI ')
//   expect(page.locator('app-article-preview p').nth(0)).toHaveText(' this is my name DO CHI HA this is my name DO CHI HAI this is my name DO CHI HAI')
// })
test('delete artice', async ({page, request})=>{
  await page.waitForTimeout(3000)
  await page.locator('app-article-preview h1').nth(0).click()
  await page.getByRole('button', {name:"Delete Article"}).nth(1).click()
  const reponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login', 
    {
      data:{
           "user" : {email: "tester123@gmail.com", password : "123456"}        
      }
    }
  )
  const reponseBody = await reponse.json()
  const accessToken = reponseBody.user.token
  console.log('Response Body:', reponseBody);
  console.log('token',accessToken)
  

  const PostArticles = await request.post('https://conduit-api.bondaracademy.com/api/articles',{
    data:{
           "article" : {"tagList": [],"title" : "shopping website without running any server-side code5.", "description": "toreApi is a free online REST API that you can use whenever you need Pseudo-real data for your e-commerce or  ", "body": "shopping website without running any server-side code. It's awesome for teaching purposes, sample codes, tests, etc." }        
         },
    headers:{
      Authorization : `Token ${accessToken}`
    } 
      
  })
  console.log('Response Body:', PostArticles);
  await expect(PostArticles.status()).toEqual(201)
   
})