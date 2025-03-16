// kiem tra chức năng tìm kiếm có hoạt động đúng hay không
import { test } from "playwright/test"
import { Search } from "../Page-Object/Search.page"
import { LoginPage } from "../Page-Object/Login.page"
import * as  account from "../data/Login.json";


let search: Search
test.beforeEach(async({page})=>{
    await page.goto('https://localhost:44336/')
    const login = new LoginPage(page)
    await login.loginWithEmailPassword(account.correctAccount.email,account.correctAccount.password)
    await page.waitForTimeout(500)
    search = new Search(page);
    
   
})
test.describe('Search with keyword',  ()=>{
        test.describe('TC2: Verify that the product list is displays correctly when searching by the laptop brand name. ( 1, 2, more than two laptop brand name matching', ()=>{     
    });
        test('Laptop dell', async({})=>{
            await search.searchWithKeyWord('dell')
            await search.verifyProductTitleInList('dell')
        })
        test('Laptop lenovo', async({})=>{
            
            await search.searchWithKeyWord('lenovo')
            await search.verifyProductTitleInList('lenovo')
            await search.verifyCountProduct(6)
        })
        test('Laptop legion', async({})=>{
            await search.searchWithKeyWord('legion')
            search.verifyProductTitleInList('legion')
        })
    })
test.describe('TC_3: Verify that the product list is displays correctly when searching with a partial laptop brand name', async  ()=>{
    const brands = ['dell', 'lenovo', 'legion'];

    brands.forEach(brand => {
    test(`Searching for ${brand}`, async ({ }) => {
      await search.searchWithKeyWord(brand);
      await search.verifyProductTitleInList(brand);
    });
  });
    // test('laptop leg', async({})=>{
            
    //         await search.searchWithKeyWord('laptop leg')
    //         await search.verifyProductTitleInList('laptop legion')
    //     })
    // test('legion', async({})=>{
            
    //         await search.searchWithKeyWord('legion')
    //         await search.verifyProductTitleInList('laptop legion')
    //     })
    // test('laptop legioa', async({})=>{
            
    //         await search.searchWithKeyWord('laptop legioa')
    //         await search.verifyProductTitleInList('laptop legion')
    //     })
})
test.describe('TC_4: verify that the product list is display correctly when searching with laptop model name. ( 1, 2, more than two product name matching )',  ()=>{
    test('xps', async({})=>{
            
            await search.searchWithKeyWord('xps')
            await search.verifyProductTitleInList('xps')
        })
    test('yoga', async({})=>{
            
            await search.searchWithKeyWord('yoga')
            await search.verifyProductTitleInList('yoga')
        })
    test('thinkpad', async({})=>{
            
            await search.searchWithKeyWord('thinkpad')
            await search.verifyProductTitleInList('thinkpad')
        })
})
test.describe('TC_5: verify that the product list is display correctly when searching with a partial laptop model name )', async ()=>{
    test('think', async({})=>{
            
            await search.searchWithKeyWord('think')
            await search.verifyProductTitleInList('thinkpad')
        })
    test('yoga', async({})=>{
            
            await search.searchWithKeyWord('thinkpa')
            await search.verifyProductTitleInList('thinkpad')
        })
    test('thinkpad', async({})=>{
            
            await search.searchWithKeyWord('thinkpak')
            await search.verifyProductTitleInList('thinkpad')
        })
})
test('TC_8: Verify that notification "Vui lòng nhập đúng định dạng " is display when searches with a special character keyword', async({})=>{
            
    await search.searchWithKeyWord('ads@$#')
    await search.verifyWhenNoProduct
})
test('TC_9: Verify the product list is not display any products when searches with keyword does not exist.', async({})=>{
            
    await search.searchWithKeyWord('')
    await search.verifyWhenNoProduct
})
test('TC_11: Verify that the product list is display correctly when user searches with speace between keyword.', async({})=>{
            
    await search.searchWithKeyWord('len ovo')
    await search.verifyWhenNoProduct
})
test('TC_12: Verify that the product list is display correctly when user searches with speace between keyword.', async({})=>{
            
    await search.searchWithKeyWord(' lenovo')
    await search.verifyProductTitleInList('lenovo')
})
