import {test,expect } from '@playwright/test'
import config from '../playwright.config';

test("create a new user", async ({ request }) => {

const response =  await request.post(config.use.baseURL+'/login', {
      data: {
        email:  "vsp11@gmail.com",
        password: "vsp212303",
      },
    });
    const userData =  await response.json();
    console.log(userData.token);
});