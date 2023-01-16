const { test, expect } = require("@playwright/test");

test("Login to swagLabs", async ({ browser }) => {
  //create the page context
  const context = await browser.newContext();
  const page = await context.newPage();
  //navigate to the swag labs page
  await page.goto("https://www.saucedemo.com/");
  //login to website
  await page.locator("//input[@placeholder='Username']").type("standard_user");
  await page.locator("//input[@placeholder='Password']").type("secret_sauce");
  await page.locator("//input[@value='Login']").click();

  //check the visibility of the elements on first page and count
  const totalItem = await page.locator(".inventory_item").count();
  console.log(totalItem);
  expect(totalItem).toBe(6);

  //get all items present
  const products = await page.locator(".inventory_item_name").allTextContents();
  console.log(products);

  //select product on first page item = "Sauce Labs Bolt T-Shirt"
  const product = "Sauce Labs Bolt T-Shirt";
  const addToCart = "((//div[@class='inventory_item'])//div//button)";

  for (var i = 0; i <= totalItem; i++) {
    const productGrapped = await page
      .locator(".inventory_item_label")
      .nth(i)
      .locator(".inventory_item_name")
      .textContent();
    console.log(productGrapped);
    if (productGrapped === product) {
      await page.locator(addToCart).nth(i).click();
      break;
    }
  }
  //verify the items in the cart
  await page.locator(".shopping_cart_badge").click();
  const itemadded = ".cart_item";
  const checkOutButton = "#checkout";
  const countItemAdded = await page.locator(itemadded).count();
  expect(countItemAdded).toBe(1);
  for (var i = 0; i <= countItemAdded; i++) {
    const addedProductGrapped = await page
      .locator(".inventory_item_name")
      .nth(i)
      .textContent();
    console.log(addedProductGrapped);
    if (addedProductGrapped === product) {
      await page.locator(checkOutButton).nth(i).click();
      break;
    }
  }
  //check out with the product
  const firstName = "//input[@placeholder='First Name']";
  const lastName = "//input[@placeholder='Last Name']";
  await page.locator(firstName).waitFor();
  await expect(page.locator(firstName)).toBeVisible();
  await expect(page.locator(lastName)).toBeVisible();
  await page.locator(firstName).type("Admin");
  await page.locator(lastName).fill("worker");
  await page.locator("#postal-code").type("1234");
  await page.locator("#continue").click();

  //verify the finish of product buy
  const productBuying = await page
    .locator(".inventory_item_name")
    .textContent();
  expect(productBuying).toBe(product);
  await page.locator("#finish").click();

  //close the page after completing the script
  await page.close();
});
