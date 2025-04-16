import {test , expect, Locator} from 'playwright/test'
import {Base} from '../Page-Object/Base.page'



export class OrderList extends Base {
      //Check OrderList 
    // private oderNumber : Locator
    // private oderTime : Locator
    // private oderStatus : Locator
    // private itemTotal : Locator
    // private totalAmount : Locator
    // private oderDetailButton : Locator

    constructor(page){
        super(page)
         //Check OrderList 
    
    }

    //Check OrderList Locator
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
