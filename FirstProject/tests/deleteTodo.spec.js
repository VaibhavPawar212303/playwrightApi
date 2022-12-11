import { test, expect } from "@playwright/test";
import config from '../playwright.config';
test("login with existing user and creating todo and updating it", async ({ request }) => {
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
  const toodDetails = await createTodo.json();
  let todoId = toodDetails._id;
  console.log(todoId);

  const deletTodo= await request.delete('http://localhost:5000/api/todo/'+todoId, {
      headers: {
        Authorization: "Bearer "+token,
      },
  });
  expect(response.status()).toBe(200);
  console.log( await deletTodo.json());
});
