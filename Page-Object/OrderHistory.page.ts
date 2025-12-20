import {test , expect, Locator, Page} from 'playwright/test'
import {Base} from './Base.page'

// Lịch sử đặt hàng ( kiểm tra các đơn hàng đã đặt )

export class OrderHistory extends Base {
      //Check OrderList 
    // private oderNumber : Locator
    // private oderTime : Locator
    // private oderStatus : Locator
    // private itemTotal : Locator
    // private totalAmount : Locator
    // private oderDetailButton : Locator

    constructor(page : Page){
        super(page)
    
    
    }

    //Check OrderList Locator (list )
    getOrderRow(rowIndex : number): Locator{
      return this.page.locator('tbody tr').nth(rowIndex);
    }
    getOrderNumber (rowIndex : number): Locator {
        return this.getOrderRow(rowIndex).locator('td').nth(0);
    }
    getOderTime (rowIndex : number): Locator {
        return this.getOrderRow(rowIndex).locator('td').nth(1);
    }
    getOrderStatus (rowIndex : number): Locator {
        return this.getOrderRow(rowIndex).locator('td').nth(2);
    }
    getItemTotal (rowIndex: number):Locator {
      return this.getOrderRow(rowIndex).locator('td').nth(3);
    }
    getTotalAmount (rowIndex: number):Locator {
      return this.getOrderRow(rowIndex).locator('td').nth(4);
    }
    getOrderDetailButton (rowIndex: number):Locator {
      return this.getOrderRow(rowIndex).locator('td').nth(5);
    }


    
    
}
