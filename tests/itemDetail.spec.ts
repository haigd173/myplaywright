import { test, expect, Page } from "@playwright/test";
import { itemDetail } from "../Page-Object/ItemDetail";
import { LoginPage } from "../Page-Object/Login.Page";

const PRODUCT_URL = "https://localhost:44336/hp-pavilion-15-eg0507tu-i5-1135g78gb256gbwin10-46m06pa-11";
const LOGIN_REQUIRED_MSG = "vui lòng đăng nhập để sử dụng chức năng này";
const INVALID_QUANTITY_MSG = "chỉ được nhập số từ 1 đến 100";
const userName = 'testaccount123@gmail.com'
const passWord = 'Hai@123456'

test.describe("Product Detail Page", () => {
  let page: Page;
  let detailPage: itemDetail;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    detailPage = new itemDetail(page);
    await page.goto(PRODUCT_URL);
  });

  test.afterEach(async () => {
    await page.close();
  });

  // TC_PD_1 - UI Display
  test("TC_PD_1: Verify all elements on Product Detail page are displayed correctly", async () => {
    expect(await detailPage.isAddToCartButtonVisible()).toBeTruthy();
    expect(await detailPage.isBuyNowButtonVisible()).toBeTruthy();
    expect(await detailPage.getProductTitle()).toBeTruthy();
    expect(await detailPage.getProductPrice()).toBeTruthy();
    expect(await page.locator(".product-description").isVisible()).toBeTruthy();
    expect(await page.locator(".product-review").isVisible()).toBeTruthy();
    expect(await page.locator(".product-specs").isVisible()).toBeTruthy();
  });

  // TC_PD_2 - Product Information Consistency
  test("TC_PD_2: Verify product info is consistent between list pages and detail page", async () => {
    await detailPage.verifyItemInfoInlistAndDetail(0);
  });

  // TC_PD_3 - Inventory Update
  test("TC_PD_3: Verify inventory is updated after checkout", async () => {
    const initialInventory = await detailPage.getInventoryQuantity();
    
    // Checkout with quantity 1
    await detailPage.addToCartWithQuantity(1);
    await page.waitForTimeout(1000);
    
    // Checkout with quantity 5
    await page.goto(PRODUCT_URL);
    await detailPage.addToCartWithQuantity(5);
    
    const finalInventory = await detailPage.getInventoryQuantity();
    expect(finalInventory).toBe(initialInventory - 6);
  });

  // TC_PD_4 - Valid Quantity Input
  test("TC_PD_4: Verify quantity accepts valid values (1–100)", async () => {
    const validQuantities = [1, 2, 99, 100];
    
    for (const qty of validQuantities) {
      await detailPage.enterQuantityOfItem(qty);
      const value = await page.locator("#quantity").inputValue();
      expect(value).toBe(qty.toString());
    }
  });

  // TC_PD_5 - Invalid Quantity Input
  test("TC_PD_5: Verify quantity does not accept invalid values", async () => {
    await detailPage.enterQuantityOfItem(101);
    await detailPage.clickOnAddToCartButton();
    
    const errorMsg = await page.locator(".error-message").textContent();
    expect(errorMsg).toContain(INVALID_QUANTITY_MSG);
  });

  test("TC_PD_5: Verify negative quantity is rejected", async () => {
    await detailPage.enterQuantityOfItem(-1);
    await detailPage.clickOnAddToCartButton();
    
    const errorMsg = await page.locator(".error-message").textContent();
    expect(errorMsg).toContain(INVALID_QUANTITY_MSG);
  });

  // TC_PD_6 - Non-numeric Input
  test("TC_PD_6: Verify quantity only accepts numeric values", async () => {
    const quantityField = page.locator("#quantity");
    
    await quantityField.fill("abc");
    expect(await quantityField.inputValue()).not.toContain("abc");
  });

  test("TC_PD_6: Verify special characters are rejected", async () => {
    const quantityField = page.locator("#quantity");
    
    await quantityField.fill("!@#$");
    expect(await quantityField.inputValue()).toBe("");
  });

  // TC_PD_7 - Require Login for Actions
  test("TC_PD_7: Verify user must login to use Add to Cart action", async () => {
    await detailPage.enterQuantityOfItem(1);
    await detailPage.clickOnAddToCartButton();
    
    const message = await page.locator("[role='alert']").textContent();
    expect(message).toContain(LOGIN_REQUIRED_MSG);
  });

  test("TC_PD_7: Verify user must login to use Buy Now action", async () => {
    await detailPage.enterQuantityOfItem(1);
    await detailPage.clickOnPaymentbuttonOnDetailWithQuantity(1);
    
    const message = await page.locator("[role='alert']").textContent();
    expect(message).toContain(LOGIN_REQUIRED_MSG);
  });

  // TC_PD_8 - Add to Cart & Buy Now
  test("TC_PD_8: Verify Add to Cart works correctly with valid quantity", async () => {
    // Note: Requires user to be logged in
    const loginPage = new LoginPage(page);
    await loginPage.loginWithEmailPassword(userName, passWord);
    
    await detailPage.addToCartWithQuantity(1);
    expect(await page.locator(".success-message").isVisible()).toBeTruthy();
  });

  test("TC_PD_8: Verify Buy Now works correctly with valid quantity", async () => {
    // Note: Requires user to be logged in
    const loginPage = new LoginPage(page);
    await loginPage.loginWithEmailPassword(userName, passWord);
    
    await detailPage.clickOnPaymentbuttonOnDetailWithQuantity(10);
    expect(page.url()).toContain("checkout");
  });

  // TC_PD_9 - Review without Login
  test("TC_PD_9: Verify user cannot review without login", async () => {
    await detailPage.clickOnReviewTab();
    await detailPage.enterReview("This is a test review");
    await detailPage.submitReview();
    
    const message = await page.locator("[role='alert']").textContent();
    expect(message).toContain(LOGIN_REQUIRED_MSG);
  });

  // TC_PD_10 - Review Input Validation
  test("TC_PD_10: Verify review accepts 20 characters minimum", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithEmailPassword(userName, passWord);
    
    await detailPage.clickOnReviewTab();
    const review20chars = "a".repeat(20);
    await detailPage.enterReview(review20chars);
    await detailPage.submitReview();
    
    expect(await page.locator(".success-message").isVisible()).toBeTruthy();
  });

  test("TC_PD_10: Verify review accepts 1800 characters maximum", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithEmailPassword(userName, passWord);
    
    await detailPage.clickOnReviewTab();
    const review1800chars = "a".repeat(1800);
    await detailPage.enterReview(review1800chars);
    await detailPage.submitReview();
    
    expect(await page.locator(".success-message").isVisible()).toBeTruthy();
  });

  test("TC_PD_10: Verify review with less than 20 characters is rejected", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithEmailPassword(userName, passWord);
    
    await detailPage.clickOnReviewTab();
    await detailPage.enterReview("short");
    await detailPage.submitReview();
    
    const errorMsg = await page.locator(".error-message").textContent();
    expect(errorMsg).toContain("20");
  });

  test("TC_PD_10: Verify review with more than 1800 characters is rejected", async () => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithEmailPassword(userName, passWord);
    
    await detailPage.clickOnReviewTab();
    const review1801chars = "a".repeat(1801);
    await detailPage.enterReview(review1801chars);
    await detailPage.submitReview();
    
    const errorMsg = await page.locator(".error-message").textContent();
    expect(errorMsg).toContain("1800");
  });
});