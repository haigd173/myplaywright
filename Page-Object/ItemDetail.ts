import { expect, Locator, Page } from "@playwright/test";
import { Base } from "./Base.page";

interface DetailPage {
  enterQuantityOfItem(quantity: number): Promise<void>
  addToCartWithQuantity(quantity: number): Promise<void>
  clickOnPaymentbuttonOnDetailWithQuantity(quantity: number): Promise<void>
  verifyItemInfoInlistAndDetail(itemNumberInList: number): Promise<void>
  clickOnReviewTab(): Promise<void>
  enterReview(reviewText: string): Promise<void>
  submitReview(): Promise<void>
  getInventoryQuantity(): Promise<number>
  getProductTitle(): Promise<string>
  getProductPrice(): Promise<string>
  isAddToCartButtonVisible(): Promise<boolean>
  isBuyNowButtonVisible(): Promise<boolean>
}

export class itemDetail extends Base implements DetailPage {
  private AddtoCartButton: Locator
  private PaymentButtonOnProductDetail: Locator
  private itemQuantityField: Locator
  private inventoryQuantity: Locator
  private reviewLink: Locator
  private reviewField: Locator
  private reviewButton: Locator
  private productTitle: Locator
  private productPrice: Locator

  constructor(page: Page) {
    super(page)
    this.AddtoCartButton = page.getByRole('button', { name: "Thêm vào giỏ" })
    this.PaymentButtonOnProductDetail = page.getByRole('button', { name: "Mua ngay" })
    this.itemQuantityField = page.locator('#quantity')
    this.inventoryQuantity = page.locator('.product-stock')
    this.reviewLink = page.locator('a[href="#reviews"]')
    this.reviewField = page.locator('#review-text')
    this.reviewButton = page.getByRole('button', { name: /review|đánh giá/i })
    this.productTitle = page.locator('h1.product-title')
    this.productPrice = page.locator('.product-price')
  }

  public async clickOnPaymentbuttonOnDetailWithQuantity(quantity: number) {
    await this.enterQuantityOfItem(quantity)
    await this.PaymentButtonOnProductDetail.click()
  }

  public async enterQuantityOfItem(quantity: number) {
    await this.itemQuantityField.fill(quantity.toString())
  }

  public async clickOnAddToCartButton() {
    await this.AddtoCartButton.click()
  }

  public async addToCartWithQuantity(quantity: number) {
    await this.enterQuantityOfItem(quantity)
    await this.clickOnAddToCartButton()
  }

  public async verifyItemInfoInlistAndDetail(itemNumberInList: number) {
    const infoItemClick = await this.getItemInfoWhenClickOnItemInList(itemNumberInList)
    const infoItemDetail = await this.getItemInfoInDetail()
    expect(infoItemClick.itemTitleinList).toBe(infoItemDetail.itemTitleDetail)
    expect(infoItemClick.itemPriceinList).toBe(infoItemDetail.itemPriceDetail)
    expect(infoItemClick.imageSrcList).toBe(infoItemDetail.imageSrcDetail)
  }

  public async clickOnReviewTab() {
    await this.reviewLink.click()
  }

  public async enterReview(reviewText: string) {
    await this.reviewField.fill(reviewText)
  }

  public async submitReview() {
    await this.reviewButton.click()
  }

  public async getInventoryQuantity(): Promise<number> {
    const text = await this.inventoryQuantity.textContent()
    return parseInt(text?.match(/\d+/)?.[0] || '0')
  }

  public async getProductTitle(): Promise<string> {
    return await this.productTitle.textContent() || ''
  }

  public async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() || ''
  }

  public async isAddToCartButtonVisible(): Promise<boolean> {
    return await this.AddtoCartButton.isVisible()
  }

  public async isBuyNowButtonVisible(): Promise<boolean> {
    return await this.PaymentButtonOnProductDetail.isVisible()
  }

  public async getItemInfoWhenClickOnItemInList(itemNumber: number) {
    // Implement based on your Home page structure
    return {
      itemTitleinList: '',
      itemPriceinList: '',
      imageSrcList: ''
    }
  }

  public async getItemInfoInDetail() {
    return {
      itemTitleDetail: await this.getProductTitle(),
      itemPriceDetail: await this.getProductPrice(),
      imageSrcDetail: ''
    }
  }
}