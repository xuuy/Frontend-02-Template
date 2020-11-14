const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.tracing.start({
    screenshots: true,
    path: 'trace.json'
  })

  await page.goto('http://47.96.119.233/gomoku/');

  await page.waitForSelector('.jss2')
  
  const buttons = await page.$$('.jss2 .MuiButtonBase-root')
  // 点击白棋
  buttons[1].click()

  const defeat = await page.$('.jss9')

  // 认输
  defeat.click()

  await page.screenshot({path: 'screenshot.png'});
  
  await page.tracing.stop()
  await browser.close();
})();