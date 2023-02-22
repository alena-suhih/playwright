// @ts-check
const { test, expect } = require("@playwright/test");
const { login, password } = require("../user");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Successful authorization", async ({ page }) => {
  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(login);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/profile");
});

test("Authorization error, invalid login", async ({ page }) => {
  await page.click("text=Войти");
  await page.screenshot({ path: "./screenshots/screenshot1.png" });
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "./screenshots/screenshot2.png" });
  await page.getByPlaceholder("Email").fill("qwe@gmail.com");
  await page.screenshot({ path: "./screenshots/screenshot3.png" });
  await page.getByPlaceholder("Пароль").fill(password);
  await page.screenshot({ path: "./screenshots/screenshot4.png" });
  await page.click("text=Войти");
  await page.screenshot({ path: "./screenshots/screenshot5.png" });
  await expect(page.getByTestId("login-error-hint")).toBeVisible;
  await page.screenshot({ path: "./screenshots/screenshot6.png" });
  await expect(page.getByText("text=Вы ввели неправильно логин или пароль"))
    .toBeVisible;
  await page.screenshot({ path: "./screenshots/screenshot7.png" });
});

test("Authorization error, invalid password", async ({ page }) => {
  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(login);
  await page.getByPlaceholder("Пароль").fill("12345");
  await page.click("text=Войти");
  await expect(page.getByTestId("login-error-hint")).toBeVisible;
  await expect(page.getByText("text=Вы ввели неправильно логин или пароль"))
    .toBeVisible;
});
