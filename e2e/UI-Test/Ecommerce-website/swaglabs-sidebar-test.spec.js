const { test,expect } = require("@playwright/test");


test("Validate the sidebar on swaglab", async ({ browser }) => {
  //create browser page and naviagate
  const context = await browser.newContext();
  const page = await context.newPage();
  //go to the swag labs
  await page.goto("https://www.saucedemo.com/");

  //login to website
  await page.locator("//input[@placeholder='Username']").type("standard_user");
  await page.locator("//input[@placeholder='Password']").type("secret_sauce");
  await page.locator("//input[@value='Login']").click();

  //click on the sidebar and check the visibility
  await page.locator("#react-burger-menu-btn").click();
  const sidebar = await page.locator(".bm-menu").isVisible();
  expect(sidebar).toBeTruthy();

  //check the sidebar options
  const sidebarOptionsCount = await page.locator(".bm-item").count();
  expect(sidebarOptionsCount).toBe(4);
  //get the text of all sidebar options and click on any text randomly
  var sideBarOptionsList = [];
  for (let index = 1; index < sidebarOptionsCount; index++) {
    const sidebarOptions = await page
      .locator(".bm-item")
      .nth(index)
      .textContent();
    sidebarOptions.slice("");
    sideBarOptionsList.push(sidebarOptions);
  }
  var count = Math.floor(Math.random() * 3);
  var selectedOption = sideBarOptionsList[count];
  await page.locator("//a[normalize-space()='" + selectedOption + "']").click();
});
