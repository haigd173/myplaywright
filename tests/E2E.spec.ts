import {test, expect } from 'playwright/test'
import { Search } from "../Page-Object/Search.page"


test('TC_E2E: Verify that ', async ({page})=>{ 
    await page.goto('https://localhost:44336/')
    const search = new Search(page)
    await search.searchWithKeyWord('')
    search.verifyWhenNoProduct
})