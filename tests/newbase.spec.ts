import {test, expect } from 'playwright/test'
import { LoginPage } from '../Page-Object/Login.Page'
import * as  account from "../data/Login.json";




test('new base', async ({page})=>{
    await page.goto('https://staging.workgot.vn/')
    await page.getByPlaceholder('email@example.com').fill('gifowil666@inkight.com')
    await page.getByPlaceholder('Nhập mật khẩu').fill('test@123')
    await page.getByRole('button', {name :('Đăng nhập')}).click()
    await page.getByRole('heading', {name :('ID: workplacewithpermission')}).click()
    await page.getByRole('button', {name :('Tạo base mới ')}).click()
})
