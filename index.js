const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://vk.com');

  await page.$eval('input[name=email]', (el) => (el.value = ''));
  await page.$eval('input[name=pass]', (el) => (el.value = ''));
  await page.click('#index_login_button');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
