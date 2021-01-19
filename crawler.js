const puppeteer = require('puppeteer');
const save = require('./save');

const emailSelector = 'input[name=ip_h]';
const emailVisibleSelector = '#index_email';
const passwordSelector = 'input[name=lg_h]';
const passwordVisibleSelector = '#index_pass';
const loginButtonSelector = '#index_login_button';
const groupsSelector = '#l_gr';
const videoUrl = 'https://vk.com/videos-72198622';
const streamButtonSelector = '#video_create_live_btn';
const streamUrlSelector = '#video_live_trans_settings_url';
const streamKeySelector = '#video_live_trans_settings_key';

module.exports = async ({ email, password }) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 1000 });
  await page.goto('https://vk.com');

  await page.click(emailVisibleSelector);
  await page.type(emailSelector, email, { delay: 50 });
  await page.click(passwordVisibleSelector);
  await page.type(passwordSelector, password, { delay: 50 });
  await page.click(loginButtonSelector);
  await page.waitForSelector(groupsSelector);
  await page.goto(videoUrl);
  await page.waitForSelector(streamButtonSelector);
  await page.click(streamButtonSelector);
  await page.waitForSelector(streamUrlSelector);
  const url = await page.$eval(streamUrlSelector, (el) => el.value);
  const key = await page.$eval(streamKeySelector, (el) => el.value);

  await page.screenshot({ path: 'screenshot.png' });

  await save(url, key);

  await browser.close();
};
