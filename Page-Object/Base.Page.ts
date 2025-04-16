import {expect, Locator, Page } from 'playwright/test'

export class Base {
  
   //in product list
  public itemTitleInList : Locator 
  public itemPriceInList : Locator  
  public imageSrcInList : Locator  
  // in detail
  private itemTitleInDetail : Locator
  private itemPriceInDetail : Locator
  private imageSrcInDetail : Locator

  

  private headerColor : Locator
  private footerColor : Locator
  private CartIcon : Locator
  private gotoCart : Locator


  readonly page :Page
  constructor(page : Page){
    this.page = page
    // in product list
    this. itemTitleInList = page.locator('#layout-3-grid').locator('h6') //.nth(parameter)    //need parameter itemNumberInList  in list
    this. itemPriceInList = page.locator('#layout-3-grid').locator('.price')//.nth(parameter)  // need parameter itemNumberInList  in list
    this. imageSrcInList = page.locator('#layout-3-grid').locator('img')//.nth(parameter)  // need parameter itemNumberInList  in list
    // in detail
    this.itemTitleInDetail = page.locator('.product-details-text h4')
    this.itemPriceInDetail = page.locator('.product-details-text').locator('.price')
    this.imageSrcInDetail = page.locator('#swiper-wrapper-6e4b652be73cf781').locator('img')



    this.CartIcon = page.locator('#CartIcon')
    this.gotoCart = page.locator('#offcanvas-add-cart').getByRole('button', {name: "Xem giỏ hàng"})


    
    this.headerColor = page.locator('.header-bottom-color--yellow')
    this.footerColor = page.locator('.footer-bg')

  }
  public async NavigateToUrl (){
    await this.page.goto('https://localhost:44336/')
  }

  public async verifyColorOfHeader (color : string){
    expect(await this.headerColor).toHaveCSS('background','rgb(254, 209, 0)')
    expect(await this.footerColor).toHaveCSS('background','rgb(58, 61, 70)')
  }
  
  // go to cart page (header)
    public async clickOnCartIcon () {
        await this.CartIcon.click()
        await this.gotoCart.click()
    }

    // Detail item
    
    public async getItemInfoInDetail (){
        const itemTitleDetail = await this.itemTitleInDetail.textContent()
        const itemPriceDetail = await this.itemPriceInDetail.textContent()
        const imageSrcDetail = await this.imageSrcInDetail.getAttribute('src')
        return {itemTitleDetail, itemPriceDetail, imageSrcDetail }
    }

  

  //(Search Page)Only list when use search
  public async getItemInfoWhenClickOnItemInList (itemNumberInList  : number){
    
        const itemTitleinList = await this.itemTitleInList.nth(itemNumberInList).textContent()
        const itemPriceinList = await this.itemPriceInList.nth(itemNumberInList).textContent()
        const imageSrcList = await this.imageSrcInList.nth(itemNumberInList).getAttribute('src')
        await this.itemTitleInList.nth(itemNumberInList).click()
        return {itemTitleinList, itemPriceinList, imageSrcList }
    }
  
  
}