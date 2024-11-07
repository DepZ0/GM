import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

// Delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Log date formatting function
const getFormattedDate = (): string => {
  const now = new Date();
  return `[${now.getDate().toString().padStart(2, "0")}.${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${now.getFullYear()} | ${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}]`;
};

const randomDelayNumber = () => {
  return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
};

// LinkedIn login and profile photo extraction
const loginToLinkedIn = async (login: string, password: string) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Logging setup
  const logStream = fs.createWriteStream(path.resolve(__dirname, "out.log"), { flags: "a" });
  const log = (...args: any[]) => logStream.write(getFormattedDate() + " " + args.join(" ") + "\n");

  try {
    log("Navigating to LinkedIn login page");

    // Navigate to LinkedIn login page and enter credentials
    await page.goto("https://www.linkedin.com/login");
    await delay(randomDelayNumber());
    await page.type("#username", login);
    await delay(randomDelayNumber());
    await page.type("#password", password);
    await delay(randomDelayNumber());
    await page.click('[type="submit"]');
    log("Attempted login");

    // Wait to check for login error messages, CAPTCHA, or successful profile load
    await delay(randomDelayNumber());

    // Check for CAPTCHA
    const captchaSelector = 'div[class*="captcha"], iframe[src*="recaptcha"]';
    const captchaPresent = await page.$(captchaSelector);

    if (captchaPresent) {
      log("CAPTCHA detected - manual intervention required");
      // Optionally, you can pause the code here or allow manual intervention
      await browser.close();
      return; // Stop execution if CAPTCHA is detected
    }

    // Check for login error messages
    const loginErrorSelectors = ["#error-for-password", "#error-for-username"];
    const loginError = await page.evaluate((selectors) => {
      return selectors.some((selector) => document.querySelector(selector) !== null);
    }, loginErrorSelectors);

    if (loginError) {
      log("Login failed - invalid email or password");
    } else {
      // Check for profile icon to confirm successful login
      const profileIconSelector =
        '[class="feed-identity-module__member-photo EntityPhoto-circle-5 evi-image lazy-image ember-view"]';
      try {
        await page.waitForSelector(profileIconSelector, { timeout: 10000 });
        log("Login successful - profile icon found");

        // Click on profile photo
        await page.click(profileIconSelector);

        // Select profile image element
        const profileImageSelector = "img.profile-photo-edit__preview";
        await page.waitForSelector(profileImageSelector, { timeout: 10000 });

        const profileImage = await page.$(profileImageSelector);
        if (profileImage) {
          const imageURL = await profileImage.getProperty("src").then((res) => res.jsonValue());
          log(`Profile photo found: ${imageURL}`);

          // Download and save profile image in profile_photos folder
          const viewSource = await page.goto(imageURL as string);
          const profilePhotosDir = path.resolve(__dirname, "profile_photos");
          if (!fs.existsSync(profilePhotosDir)) fs.mkdirSync(profilePhotosDir);
          const imagePath = path.resolve(profilePhotosDir, `${login}.jpg`);
          fs.writeFileSync(imagePath, await viewSource!.buffer());
          log(`Profile photo saved as ${imagePath}`);
        } else {
          log("Profile photo not found");
        }
      } catch {
        log("Login failed - profile icon not found");
      }
    }

    await browser.close();
    log("Browser closed");
  } catch (error) {
    log("An error occurred:", error);
    await browser.close();
  } finally {
    logStream.end();
  }
};

// Call function with specified login and password
loginToLinkedIn("LOGIN", "PASSWORD");
