import { chromium } from "playwright";
import fs from "fs";

export async function loginToNaukri(page, email, password) {
  try {
    await page.goto("https://www.naukri.com/nlogin/login");

    console.log(email, password);

    await page.fill("#usernameField", email); // Replace with your email
    await page.fill('input[type="password"]', password); // Replace with your password

    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    console.log("Logged in successfully!");
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export async function startNaukriBot(email, password, resumePath) {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  try {
    await loginToNaukri(page, email, password);

    await page.goto("https://www.naukri.com/mnjuser/profile");

    // Update Resume Headline
    await page.click('.widgetHead:has-text("Resume headline") .edit.icon');
    await page.getByRole("button", { name: "Save" }).click();

    // Update Key Skills
    await page.click('.widgetHead:has-text("Key Skills") .edit.icon');
    await page.getByRole("button", { name: "Save" }).click();

    await page.setInputFiles('input[type="file"]', resumePath);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
}
