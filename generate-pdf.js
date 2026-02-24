const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Use puppeteer-core with system chrome
async function main() {
  let puppeteer;
  try {
    puppeteer = require('puppeteer-core');
  } catch(e) {
    console.log('puppeteer-core not found, trying puppeteer');
    puppeteer = require('puppeteer');
  }

  // Find chrome
  const chromePaths = [
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium', 
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    process.env.CHROME_PATH
  ].filter(Boolean);

  let chromePath;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) { chromePath = p; break; }
  }

  if (!chromePath) {
    // Try to find any chrome
    try {
      chromePath = execSync('find / -name "chrome" -o -name "chromium" 2>/dev/null | head -1').toString().trim();
    } catch(e) {}
  }

  if (!chromePath) {
    console.error('No Chrome/Chromium found');
    process.exit(1);
  }

  console.log('Using Chrome at:', chromePath);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const filePath = path.resolve(__dirname, 'proposta.html');
  await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: path.resolve(__dirname, 'Raw-English-Proposta-Comercial.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  console.log('PDF generated!');
  
  // English version
  await page.evaluate(() => setLang('en'));
  await page.pdf({
    path: path.resolve(__dirname, 'Raw-English-Business-Proposal.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  console.log('English PDF generated!');
  await browser.close();
}

main().catch(console.error);
