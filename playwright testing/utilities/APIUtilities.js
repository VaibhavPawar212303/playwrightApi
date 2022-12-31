const config = require("../../playwright.config");

const CreateRandomEmail = () => {
  const random = Math.floor(Math.random() * 100) + 1;
  const email = `vaibhav${random}@gmail.com`;
  return email;
};

const CrateRandomName = () => {
  const random = Math.floor(Math.random() * 100) + 1;
  const name = `vaibhav${random}`;
  return name;
};

const CrateRandomPassword = () => {
  const random = Math.floor(Math.random() * 100) + 1;
  const password = `vaibhav${random}`;
  return password;
};

module.exports = { CreateRandomEmail, CrateRandomName, CrateRandomPassword };
