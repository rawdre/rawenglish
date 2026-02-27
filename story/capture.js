const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920 });
    await page.goto('file://' + path.join(__dirname, 'index.html'), { waitUntil: 'load' });
    await page.screenshot({ path: path.join(__dirname, 'story.png'), type: 'png' });
    console.log('Story image saved!');
    await browser.close();
})();
