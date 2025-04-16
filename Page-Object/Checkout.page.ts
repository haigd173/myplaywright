import { Locator } from "playwright";
import { Base } from "./Base.page";



export class Checkout extends Base {



    // OderAddress
    private provinceCitySelect : Locator
    private districtSelect : Locator
    private wardSelect : Locator
    private fullNameField : Locator
    private numberPhoneField : Locator
    private addressDetail : Locator
    private SendToAnotherAddressCheckBox :Locator
    private oderNote :Locator
    private oderButton : Locator

    //ItemList
    private itemTitleinList : Locator
    private itemTotalPriceinList : Locator
    private itemQuantity : Locator

    private totalNoShipfee : Locator
    private disscount : Locator
    private shipfee : Locator
    private totalWithShipfee : Locator

    //Check OrderList 
    private oderNumber : Locator
    private oderTime : Locator
    private oderStatus : Locator
    private itemTotal : Locator
    private totalAmount : Locator
    private OderDetailButton : Locator
    

   
   
 
    constructor(page){
        super(page)

        
    // OderAddress
    this.provinceCitySelect  = page.locator('[name="province_id"]').nth(0)
    this.districtSelect =   page.locator('[name="district_id"]').nth(0)
    this.wardSelect =   page.locator('[name="ward_id"]').nth(0)
    this.fullNameField = page.locator('[name="orderUsername"]') 
    
    this.numberPhoneField = page.locator('#phone-number')
    this.addressDetail = page.locator('#content')
    this.SendToAnotherAddressCheckBox = page.getByText('Gửi đến một địa chỉ khác?')  /// lỗi khi check
    this.oderNote = page.getByPlaceholder('Ghi chú về đơn đặt hàng của bạn, ví dụ: những lưu ý đặc biệt khi giao hàng.')
    this.oderButton = page.getByRole('button', { name :(' Đặt hàng ngay ')})

    //ItemList
    this.itemTitleinList = page.locator('tbody tr a')
    this.itemTotalPriceinList = page.locator('tbody span')
    this.itemQuantity = page.locator('tbody strong').   /// kết quả ( x số lượng) ex: x 1, x 2

    this.totalNoShipfee =  page.locator('tfoot tr').first().locator('td')    
    this.disscount =  page.locator('tfoot tr').nth(1).locator('td')    
    this.shipfee =  page.locator('tfoot tr').nth(2).locator('td')    
    this.totalWithShipfee = page.locator('tfoot tr').nth(3).locator('td')  
    
        
        

    }

}