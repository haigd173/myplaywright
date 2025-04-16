import {test, expect, chromium } from 'playwright/test'
import { Search } from "../Page-Object/Search.page"
import { LoginPage } from '../Page-Object/Login.Page'
import { Cart } from '../Page-Object/Cart.page'
import * as  account from "../data/Login.json";
import { locator } from 'codeceptjs';
import { OrderList } from '../Page-Object/Orderlist.page';
import { OderDetail } from '../Page-Object/OrderDetail.page';
import { waitForDebugger } from 'inspector';
import path from 'path'

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
test('checkuot Check', async ({page})=>{
   await page.goto('https://localhost:44336/')
   const login = new LoginPage(page)
     const cart = new Cart(page)
    await login.loginWithEmailPassword(account.correctAccount.email,account.correctAccount.password)
    await page.waitForTimeout(500)
     await page.locator('.image-box').nth(1).hover()
    await page.waitForTimeout(500)
    await page.locator('.btnAddToCart').nth(1).click()
    await page.goto('https://localhost:44336/checkout')
    await page.waitForTimeout(500)
   await page.locator('[name="district_id"]').nth(0).click()
   await page.locator('[name="orderUsername"]').fill('haido')
   await page.locator('#newShipping').evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
const box = await page.locator('#newShipping').boundingBox();
     console.log('Bounding box:', box);
   await page.waitForTimeout(50)
   await page.getByText('Gửi đến một địa chỉ khác?').click()  
})
test('orderditail check', async ({page})=>{
  await page.goto('https://localhost:44336/')
   const login = new LoginPage(page)
     const cart = new Cart(page)
    await login.loginWithEmailPassword(account.correctAccount.email,account.correctAccount.password)
    await page.waitForTimeout(500)
    await page.goto('https://localhost:44336/order_detail/94')
    
    const imageLocators = await page.locator('tbody tr').locator('.product_thumb img').all();

    // const itemtitleList = await page.locator('tbody tr').locator('.product_name').allTextContents()
    // const itemImagesrc = await Promise.all( imageLocators.map(img => img.getAttribute('src')) )
    // const itemgia = await page.locator('tbody tr').locator('.product-price.text-danger').allTextContents()
    // const itemsoluong = await page.locator('tbody tr').locator('.product_quantity').allTextContents()
    // const itemthanhtien = await page.locator('tbody tr').locator('.product_total').allTextContents()
    const itemdetial = new OderDetail(page)
     const itemtitleList = await itemdetial.getItemTitle(2).textContent()
    //  const itemtitleList = await page.locator('tbody tr').nth(1).locator('.product_name').allTextContents()
    const itemImagesrc = await itemdetial.getImageSrc(2).getAttribute('src')
    const itemgia =  await itemdetial.getItemPrice(2).textContent()
    const itemsoluong =  await itemdetial.getItemQuantity(2).textContent()
    const itemthanhtien =  await itemdetial.getTotalAmountofItem(2).textContent()
    console.log('ten',itemtitleList)
    console.log('anh',itemImagesrc)
    console.log('gia',itemgia)
    console.log('soluonbg',itemsoluong)
    console.log('thanhtien',itemthanhtien)
})

test.skip('Test with existing Chrome profile', async () => {
  test.setTimeout(3600 * 1000);

  const userDataDir = path.resolve('C:/Users/haiGD/AppData/Local/Google/Chrome/NewUserData');

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--disable-blink-features=AutomationControlled']
  });

  const page = await context.newPage();

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  await page.goto('https://www.tiktok.com/@xxxhdxxx');
  await page.waitForTimeout(5432);

  await page.getByText('Following').nth(2).click();
  await page.waitForTimeout(2443);

  const processedButtons = new Set<string>(); // Để không click lại những nút đã xử lý

  let previousScrollTop = -1;
  while (true) {
    // Lấy tất cả các nút có text là "Following"
    const buttons = await page.$$(`button[data-e2e="follow-button"]`);

    for (const btn of buttons) {
      const innerText = (await btn.innerText()).trim();
      const btnId = await btn.evaluate(el => el.getAttribute('aria-label') || el.outerHTML);

      if (innerText === 'Following' && !processedButtons.has(btnId)) {
        try {
          await btn.click();
          console.log(`→ Clicked Following: ${btnId}`);

          const confirm = await page.waitForSelector('text=Unfollow', { timeout: 500 }).catch(() => null);
          if (confirm) {
            await confirm.click();
            console.log(`✓ Đã unfollow: ${btnId}`);
          }

          processedButtons.add(btnId);
          await page.waitForTimeout(1000 + Math.random() * 500);

        } catch (error) {
          console.log('✗ Lỗi khi xử lý button:', error);
        }
      }
    }

    // Cuộn container từ từ
    const scrollResult = await page.evaluate(() => {
      const container = document.querySelector('.css-wq5jjc-DivUserListContainer.eorzdsw0');
      if (!container) return { scrolled: false, currentTop: -1 };

      const before = container.scrollTop;
      container.scrollBy(0, 300);
      return { scrolled: true, currentTop: container.scrollTop };
    });

    if (!scrollResult.scrolled || scrollResult.currentTop === previousScrollTop) {
      console.log('📌 Đã cuộn hết danh sách hoặc không thể cuộn thêm.');
      break;
    }

    previousScrollTop = scrollResult.currentTop;
    await page.waitForTimeout(1500); // Chờ để load thêm user
  }

  console.log('✅ Quét và unfollow hoàn tất!');
  await page.waitForTimeout(5000000); // giữ trang mở để quan sát
})