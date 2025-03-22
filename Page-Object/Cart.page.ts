import {test , expect, Locator} from 'playwright/test'
import {Base} from '../Page-Object/Base.page'




export class Cart extends Base {

  

    // in product detail 

    private AddtoCartButton :Locator
    private PaymentButtonOnProductDetail: Locator
    private itemQuantityField :Locator

    // in cart (list) locator for each item
    private removeButton : Locator
    private imageSrc :Locator
    private itemTitleInCart : Locator
    private itemPriceInCart : Locator
    private quantityFieldInCart : Locator
    private toTalPriceOneItemInCart :Locator
    private inCreaseButton :Locator
    private disCreaseButton : Locator

    //in cart (only)
    private totalPriceText : Locator
    private totalPriceNoShippingfeeText : Locator
    private discountDisplay : Locator
    private ShippingfeeDisplay   :Locator
    private discountField : Locator
    private applyDiscountButton : Locator
    private paymentButton : Locator
    
    
    constructor(page){
        super(page)

        // in product list
        // this. itemTitleInList = page.locator('#layout-3-grid').locator('h6') //.nth(parameter)    //need parameter itemNumberInList  in list
        // this. itemPriceInList = page.locator('#layout-3-grid').locator('.price')//.nth(parameter)  // need parameter itemNumberInList  in list
        // this. pictureLinkInList = page.locator('#layout-3-grid').locator('img')//.nth(parameter)  // need parameter itemNumberInList  in list

        /// in item detail

        this.AddtoCartButton =  page.getByRole('button', {name:("Thêm vào giỏ")})
        this.PaymentButtonOnProductDetail = page.getByRole('button', {name:("Mua ngay")})
        this.itemQuantityField = page.locator('#quantity')
        

        
    // in cart (list) locator for each item\
    const Itemtable = page.locator('tbody')
    this.removeButton = Itemtable.locator('.js-delete')  //.nth(number) for only item
    this.imageSrc = Itemtable.locator('img')
    this.itemTitleInCart = Itemtable.locator('.product-price')
    this.itemPriceInCart = Itemtable.locator('.product_name')
    this.quantityFieldInCart = Itemtable.locator('input')
    this.toTalPriceOneItemInCart = Itemtable.locator('.product_total')
    this.inCreaseButton = Itemtable.locator('.fa.fa-plus')
    this.disCreaseButton = Itemtable.locator('.fa.fa-minus')

    // (only)
    this.totalPriceText = page.locator('.cart_amount.totalPriceWithFee')
    this.totalPriceNoShippingfeeText = page.locator('.cart_amount.totalPrice')
    this.discountDisplay = page.locator('#discount')
    this.ShippingfeeDisplay = page.locator('.cart_subtotal').nth(3).locator('p').nth(1)
    this.discountField = page.getByPlaceholder('Mã giảm giá')
    this.applyDiscountButton = page.getByRole('button', {name :("Áp dụng")})
    this.paymentButton =  page.getByRole('button', {name :("Hoàn tất thanh toán")})

        
    }

    // Enter quantity of item in detail
    private async enternQuantityOfItem (quantity : number){
        await this.itemQuantityField.fill(quantity.toString())
    }
    // add item to cart 
    private async clickOnAddToCartButton (){
        await this.AddtoCartButton.click()
    }
    // pick a item in list 
    public async clickOnItemInList( itemNumberInList  : number){
        await this.itemPriceInList.nth(itemNumberInList ).click()
    }
    // add to cart with quantity
    public async addToCartWithQuantity (quantity : number){
        await this.enternQuantityOfItem(quantity)
        await this.clickOnAddToCartButton()
    }
    // click on buy now 
    private async clickOnPaymentbuttonOnDetail(){
        await this.PaymentButtonOnProductDetail.click()
    }

     private async clickOnPaymentbuttonOnDetailWithQuantity(){
        await this.PaymentButtonOnProductDetail.click()
    }
    // private async getItemInfoWhenClickOnItemInList (itemNumberInList  : number){
    //     const itemTitleinList = await this.itemTitleInList.nth(itemNumberInList).textContent()
    //     const itemPriceinList = await this.itemPriceInList.nth(itemNumberInList).textContent()
    //     const pictureLinkList = await this.pictureLinkInList.nth(itemNumberInList).getAttribute('src')
    //     return {itemTitleinList, itemPriceinList, pictureLinkList }
    // }

    // private async getItemInfoInDetail (){
    //     const itemTitleDetail = await this.itemTitleInDetail.textContent()
    //     const itemPriceDetail = await this.itemPriceInDetail.textContent()
    //     const pictureLinkDetail = await this.pictureLinkInDetail.getAttribute('src')
    //     return {itemTitleDetail, itemPriceDetail, pictureLinkDetail }
    // }

    // Verify the item info in list when click on item is displayed correctly like item info in detail
    public async verifyItemInfoInlistAndDetail (itemNumberInList  : number){
        const infoItemClickawait = await this.getItemInfoWhenClickOnItemInList(itemNumberInList)
        const infoItemDetail = await this.getItemInfoInDetail()
        expect((await infoItemClickawait).itemTitleinList).toBe(infoItemDetail.itemTitleDetail)
        expect((await infoItemClickawait).itemPriceinList).toBe(infoItemDetail.itemPriceDetail)
        expect((await infoItemClickawait).imageSrcList).toBe(infoItemDetail.imageSrcDetail)
    }



}