import { test, expect } from "@playwright/test";
import config from '../playwright.config';
test("login with existing user and creating todo", async ({ request }) => {
  const response =  await request.post(config.use.baseURL+'/login', {
        data: {
          email:  "vsp11@gmail.com",
          password: "vsp212303",
        },
      });
     const userData = await  response.json();
     console.log(userData);
     let token = userData.token;
     console.log(token);
const createTodo= await request.post("http://localhost:5000/api/todo", {
      headers: {
        Authorization: "Bearer "+token,
      },
    data: {
      title: "api registration with playwright",
      description: "done with api calls for registration and login",
    },
  });
  expect(response.status()).toBe(200);
  console.log(await createTodo.json());
});
