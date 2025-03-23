import { chromium } from "playwright";
import fs from "fs";

function delay(min = 500, max = 1000) {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min) + min))
  );
}

export async function loginToNaukri(page, email, password) {
  try {
    await page.goto("https://www.naukri.com/nlogin/login");
    await delay(2000, 2000);

    await page.fill("#usernameField", email);
    await page.fill('input[type="password"]', password);

    await page.hover('button[type="submit"]');
    await delay(500, 500);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    console.log("Logged in successfully!");
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

export async function updateResumeHeadline(page) {
  await delay();
  await page.hover('.widgetHead:has-text("Resume headline")');
  await page.click('.widgetHead:has-text("Resume headline") .edit.icon');
  await delay();
  await page.getByRole("button", { name: "Save" }).click();
}

export async function updateKeySkills(page) {
  await delay();
  await page.hover('.widgetHead:has-text("Key Skills")');
  await page.click('.widgetHead:has-text("Key Skills") .edit.icon');
  await delay();
  await page.getByRole("button", { name: "Save" }).click();
}

export async function updateEditProfile(page) {
  await delay();
  await page.hover('.hdn em.icon.edit[data-ga-track*="EditProfile"]');
  await page.click('.hdn em.icon.edit[data-ga-track*="EditProfile"]');
  await delay();
  await page.getByRole("button", { name: "Save" }).click();
}

export async function updateResume(page, resumePath) {
  try {
    const deleteResumeButton = page.locator(
      'span.icon-wrap[data-title="delete-resume"]'
    );

    if (await deleteResumeButton.isVisible()) {
      await delay();
      await deleteResumeButton.hover();
      await delay();
      await deleteResumeButton.click();
      await delay();

      const deleteButton = page.getByRole("button", { name: "Delete" });
      await deleteButton.waitFor({ state: "visible" });
      await delay();
      await deleteButton.click();
      await page.waitForTimeout(2000);
    }

    const uploadResumeSpan = page.locator(
      'span.dummyUploadNewCTA:has-text("Upload resume")'
    );
    await uploadResumeSpan.waitFor({ state: "visible" });
    await delay();
    await uploadResumeSpan.hover();
    await delay();
    await uploadResumeSpan.click();

    await page.setInputFiles('input[type="file"]', resumePath);
    await page.waitForTimeout(3000);

    console.log("Resume updated successfully!");
  } catch (error) {
    console.error("Error updating resume:", error);
  }
}

export async function startNaukriBot(email, password, resumePath) {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  try {
    await loginToNaukri(page, email, password);

    await page.goto("https://www.naukri.com/mnjuser/profile");

    await updateEditProfile(page);
    await updateResumeHeadline(page);
    await updateKeySkills(page);
    await updateResume(page, resumePath);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await delay(2000, 1000);
    await browser.close();
  }
}
