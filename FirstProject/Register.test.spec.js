import {test,expect } from '@playwright/test';
const config = require('../playwright.config');
test("create a new user", async ({ request }) => {

    const response = await request.post(config.use.baseURL+'/register', {
      data: {
        name: "vaibhav212333",
        email:  "vsp112233@gmail.com",
        password: "vsp212303",
      },
    });

    expect(response.status()).toBe(200);
    console.log(await response.json());
  });