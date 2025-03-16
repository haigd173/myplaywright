import {test , expect, Locator} from 'playwright/test'
import {Base} from '../Page-Object/Base.page'




class Cart extends Base {

    private CartIcon : Locator
    private AddtoCartButton :Locator
    private PaymentButtonOnProductDetail: Locator
    private itemQuantityField :Locator
    private itemTitle : Locator
    private itemPrice : Locator

    constructor(page){
        super(page)

        this.CartIcon = page.locator('#CartIcon')
        this.AddtoCartButton = await page.getByText('17.990.000₫').click();
        this.PaymentButtonOnProductDetail = page.getByRole('button', {name:("Mua ngay")})
        this.itemQuantityField = page.locator('#quantity')
        this.itemTitle = page.locator('.product-details-text h4')
        this.itemPrice = page.locator('.product-details-text').locator('price')
    }

}