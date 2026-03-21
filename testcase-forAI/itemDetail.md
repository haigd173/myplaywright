

Feature: Product Detail

Home page URL : https://localhost:44336

product detail URL: https://localhost:44336/hp-pavilion-15-eg0507tu-i5-1135g78gb256gbwin10-46m06pa-11

# Product Detail Test Cases

## TC_PD_1 - UI Display
**Description:** Verify all elements on Product Detail page are displayed correctly.

**Steps:**
1. Click a product from Home page.
2. Verify the following elements:
   - Title
   - Brand
   - Price
   - Quantity field
   - Buttons (Add to cart, Buy now)
   - Description
   - Review
   - Specifications

**Expected:**
- All elements are displayed correctly as design.

---

## TC_PD_2 - Product Information Consistency
**Description:** Verify product info is consistent between list pages and detail page.

**Steps:**
1. From Home/Search/Cart page, note product info (title, price, image).
2. Click the product.
3. Compare with Product Detail page.

**Expected:**
- Product information matches selected product.

---

## TC_PD_3 - Inventory Update
**Description:** Verify inventory is updated after checkout.

**Steps:**
1. Checkout product with quantity = 1.
2. Checkout product with quantity = 5.
3. Check inventory after checkout.

**Expected:**
- Inventory decreases correctly based on quantity.

---

## TC_PD_4 - Valid Quantity Input
**Description:** Verify quantity accepts valid values (1–100).

**Precondition:** Product inventory > 100

**Steps:**
1. Enter quantity: 1, 2, 99, 100.
2. Click "Add to cart".

**Expected:**
- Input accepted.
- Product added successfully.

---

## TC_PD_5 - Invalid Quantity Input
**Description:** Verify quantity does not accept invalid values.

**Steps:**
1. Enter: -1, 101, 1000.
2. Observe response.

**Expected:**
- Input rejected.
- Message displayed: "chỉ được nhập số từ 1 đến 100".

---

## TC_PD_6 - Non-numeric Input
**Description:** Verify quantity only accepts numeric values.

**Steps:**
1. Enter text, special characters, space.
2. Observe response.

**Expected:**
- Input rejected.
- Error message displayed.

---

## TC_PD_7 - Require Login for Actions
**Description:** Verify user must login to use actions.

**Steps:**
1. Click "Add to cart".
2. Click "Buy now".

**Expected:**
- Message displayed: "vui lòng đăng nhập để sử dụng chức năng này".

---

## TC_PD_8 - Add to Cart & Buy Now
**Description:** Verify buttons work correctly.

**Precondition:** Product inventory > 100

**Steps:**
1. Add to cart with quantity = 1, 10.
2. Click Buy now with quantity = 1, 10.

**Expected:**
- Add to cart: cart updated correctly.
- Buy now: redirect to checkout with correct info.

---

## TC_PD_9 - Review without Login
**Description:** Verify user cannot review without login.

**Steps:**
1. Enter review.
2. Click "Review".

**Expected:**
- Message displayed: "vui lòng đăng nhập để sử dụng chức năng này".

---

## TC_PD_10 - Review Input Validation
**Description:** Verify review accepts 20–1800 characters.

**Steps:**
1. Enter review with:
   - 20 chars
   - 21 chars
   - 1799 chars
   - 1800 chars
2. Submit review.

**Expected:**
- Review submitted successfully.
- Displayed in review list.