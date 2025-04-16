import { expect, Locator } from "@playwright/test";
import { Base } from "./Base.page";
import { LoginPage } from "./Login.Page";

interface DetailPage {
  enterQuantityOfItem(quantity: number) :Promise<void>
  addToCartWithQuantity(quantity: number): Promise<void>
  clickOnPaymentbuttonOnDetailWithQuantity(quantity : number): Promise<void>
  verifyItemInfoInlistAndDetail(itemNumberInList: number): Promise<void>
}

export class itemDetail extends Base implements DetailPage {
   

    // in product detail 
    private AddtoCartButton :Locator
    private PaymentButtonOnProductDetail: Locator
    private itemQuantityField :Locator
    private inventoryQuantity : Locator

    // review
    private reviewLink : Locator
    private reviewField :Locator
    private reviewButton : Locator
    private descriptionLink : Locator
    private specificationLink : Locator



    constructor(page){
        super(page)

        this.AddtoCartButton =  page.getByRole('button', {name:("Thêm vào giỏ")})
        this.PaymentButtonOnProductDetail = page.getByRole('button', {name:("Mua ngay")})
        this.itemQuantityField = page.locator('#quantity') 
        this.inventoryQuantity = page.locator('.product-stock')

        // review
        this.reviewLink = page.locator('')

        

    }
     // click on buy now 
    private async clickOnPaymentbuttonOnDetail(){
        await this.PaymentButtonOnProductDetail.click()
    }

    public async clickOnPaymentbuttonOnDetailWithQuantity(quantity : number){
        await this.enterQuantityOfItem(quantity)
        await this.PaymentButtonOnProductDetail.click()
    }
    public async enterQuantityOfItem (quantity : number){
        await this.itemQuantityField.fill(quantity.toString())
    }
  
    public async clickOnAddToCartButton (){
        await this.AddtoCartButton.click()
    }
    // add to cart with quantity
    public async addToCartWithQuantity (quantity : number){
        await this.enterQuantityOfItem(quantity)
        await this.clickOnAddToCartButton()
    }

    // Verify the item info in list when click on item is displayed correctly like item info in detail (danh sách và chi tiết)
        public async verifyItemInfoInlistAndDetail (itemNumberInList  : number){
            const infoItemClickawait = await this.getItemInfoWhenClickOnItemInList(itemNumberInList)
            const infoItemDetail = await this.getItemInfoInDetail()
            expect((await infoItemClickawait).itemTitleinList).toBe(infoItemDetail.itemTitleDetail)
            expect((await infoItemClickawait).itemPriceinList).toBe(infoItemDetail.itemPriceDetail)
            expect((await infoItemClickawait).imageSrcList).toBe(infoItemDetail.imageSrcDetail)

        }
    

    
}