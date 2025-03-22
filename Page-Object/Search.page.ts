import  { Locator, Page } from 'playwright/test'
import { expect } from 'playwright/test'
import { Base } from './Base.page'
import { title } from 'process'





export class Search extends Base {
    
    private SearchIcon : Locator
    private SearchField : Locator
    private SearchButton : Locator
    

    
    constructor(page : Page ){
        super(page)
        this.SearchIcon = page.locator('.header-action-link.action-color--black.action-hover-color--golden').locator('li').nth(1)
        this.SearchField =  page.getByPlaceholder('Nhập thông tin tại đây')
        this.SearchButton =  page.getByRole('button', {name :("Tìm Kiếm")})
    }



    public async openSearchField(){
         await this.SearchIcon.click()
         
    }
    
    async searchWithKeyWord(keyword : string ){
        await this.openSearchField()
        await this.enterKeywordToSearch(keyword)
        await this.clickSearchButton()

    }

    async enterKeywordToSearch(keyword : string ){
        await this.SearchField.fill(keyword)
    }

    async clickSearchButton(){
        await this.SearchButton.click()
        await this.page.waitForTimeout(500)
    }
    async verifyProductTitleInList (expectkeyword: string ){

        const listTitle = await this.page.locator('#layout-3-grid').locator('h6').allTextContents()    
        listTitle.forEach(title =>{
            expect(title.toLowerCase()).toContain(expectkeyword)
        })        
    }
    public async verifyCountProduct(quality :number){
        const listTitle = await this.page.locator('.col-xl-4.col-sm-6.col-12')
        await expect(listTitle).toHaveCount(quality)
    }
    async verifyWhenNoProduct(){
        expect(await this.page.locator('#layout-3-grid p')).toHaveText('Không có sản phẩm')
        await this.verifyCountProduct(0)
    }
    public async verifyPriceInRange( minPrice: number , maxPrice: number) {
        const allpriceText = await this.page.locator('selector').allTextContents();    
        allpriceText.forEach(item =>{
            const price = parseInt(item.replace(/[^\d]/g, ''), 10);
            expect(price).toBeGreaterThanOrEqual(minPrice);
            expect(price).toBeLessThanOrEqual(maxPrice);
        })
    }
} 
