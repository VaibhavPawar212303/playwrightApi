import { test, expect } from "@playwright/test";
const config = require("../../playwright.config");
import {
  CrateRandomName,
  CrateRandomPassword,
  CreateRandomEmail,
} from "../utilities/APIUtilities";

const name = CrateRandomName();
const email = CreateRandomEmail();
const password = CrateRandomPassword();

test("create a new user by Registration", async ({ request }) => {
  const response = await request.post(`${config.use.baseURL}/register`, {
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  console.log(await response.json());

  //Login user With same Email and PassWord
  const LoginResponse = await request.post(config.use.baseURL + "/login", {
    data: {
      email: email,
      password: password,
    },
  });
  const userData = await LoginResponse.json();
  console.log(userData);
});
