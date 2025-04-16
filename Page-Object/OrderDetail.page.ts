import {test , expect, Locator} from 'playwright/test'
import {Base} from '../Page-Object/Base.page'



export class OderDetail extends Base {
  
    // ORDER DETAIL PAGE
     // Check Oder Detail (order item list )
    // private titleItem : Locator
    // private imageSrc : Locator
    // private itemPrirce :Locator
    // private itemQuantityInOderDetail : Locator
    // private totalAmoutInOderDetail : Locator
    // Check Oder Detail (Oder Address)
    private oderName : Locator
    private numberPhone :Locator
    private oderAddressDetail : Locator
    // Check Oder Detail (PRICE)
    private totalAmountNoShip : Locator
    private disscountInOderDetail : Locator
    private shipFeeInOderDetail : Locator
    private totalAmountWithShip : Locator



    constructor(page){
        super(page)
       
    // ORDER DETAIL PAGE
    // Check Oder Detail
   
    // Oder Address
    this.oderName =  page.locator('.cart_amount').nth(1)
    this.numberPhone  = page.locator('.cart_amount').nth(2)
    this.oderAddressDetail =   page.locator('.cart_amount').nth(3)
    // Summary 
    this.totalAmountNoShip =   page.locator('.cart_amount').nth(4)
    this.disscountInOderDetail =  page.locator('.cart_amount').nth(5)
    this.shipFeeInOderDetail =   page.locator('.cart_amount').nth(6)
    this.totalAmountWithShip = page.locator('.cart_amount').nth(7)
    
    }

    // Check Oder Detail Locator 
    getItemTitle(index :number) :Locator {
    return this.page.locator('tbody tr').nth(index).locator('td').nth(0)
    }
    getImageSrc(index :number) :Locator {
    return this.page.locator('tbody tr').nth(index).locator('img')
    }
    getItemPrice(index :number) :Locator {
    return this.page.locator('tbody tr').nth(index).locator('td').nth(2)
    }
    getItemQuantity(index :number) :Locator {
    return this.page.locator('tbody tr').nth(index).locator('td').nth(3)
    }
    getTotalAmountofItem(index :number) :Locator {
    return this.page.locator('tbody tr').nth(index).locator('td').nth(4)
    }

    //method 
    
}
