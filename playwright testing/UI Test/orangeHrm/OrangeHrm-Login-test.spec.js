const { test, expect } = require("@playwright/test");

test("Navigate to the OrangeHrm Page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  //verify the page title of the orangeHrm
  console.log(await page.title());
  await expect(page).toHaveTitle("OrangeHRM");
  //check the visibility of image logo on page
  const imgOrangeHrmLoginPage = page.getByAltText("company-branding");
  await expect(imgOrangeHrmLoginPage).toBeVisible();
  //login text visibility
  const loginText = page.locator("//h5[normalize-space()='Login']");
  await expect(loginText).toBeVisible();
  //username text visibility
  const userNameText = page.locator("//label[normalize-space()='Username']");
  await expect(userNameText).toBeVisible();
  //password text visibility
  const userPasswordText = page.locator(
    "//label[normalize-space()='Password']"
  );
  await expect(userPasswordText).toBeVisible();
  //login text visibility
  const loginButton = page.getByRole("button", { name: " Login " });
  await expect(loginButton).toBeVisible();

  //get the user name and password
  const getUsername = await page
    .locator("//p[normalize-space()='Username : Admin']")
    .textContent();
  const Username = getUsername.slice(11, 16);
  const getUserPassword = await page
    .locator("//p[normalize-space()='Password : admin123']")
    .textContent();
  const Userpassword = getUserPassword.slice(11, 19);

  //click on login button and check the alert msg
  //click on login button
  await page.getByRole("button", { name: " Login " }).click();
  await page.locator("div.oxd-form-row:nth-child(2) > div:nth-child(1) > span")
    .toBeVisible;
  await page.locator("div.oxd-form-row:nth-child(3) > div:nth-child(1) > span")
    .toBeVisible;

  //login with the username only
  await page.locator("//input[@placeholder='Username']").type(Username);
  //click on login button
  await page.getByRole("button", { name: " Login " }).click();
  await page.locator("div.oxd-form-row:nth-child(3) > div:nth-child(1) > span")
    .toBeVisible;

  //login with the password only
  await page.locator("//input[@placeholder='Password']").type(Username);
  //click on login button
  await page.getByRole("button", { name: " Login " }).click();
  await page.locator("div.oxd-form-row:nth-child(2) > div:nth-child(1) > span")
    .toBeVisible;

  //login to orange Hrm website
  await page.locator("//input[@placeholder='Username']").type(Username);
  await page.locator("//input[@placeholder='Password']").type(Userpassword);
  //click on login button
  await page.getByRole("button", { name: " Login " }).click();

  //check  the url
  await expect(page).toHaveURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
  );
  await page.pause();
});
