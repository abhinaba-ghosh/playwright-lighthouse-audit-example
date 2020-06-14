import { chromium, Browser, Page } from 'playwright';
import { playAudit } from 'playwright-lighthouse';

let browser: Browser;
let page: Page;

describe('Playwright web page audits using lighthouse', () => {
  beforeAll(async () => {
    browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
    });
    page = await browser.newPage();
    await page.goto('https://angular.io/');
  });

  it('perform web page audit with custom score for all categories', async () => {
    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        performance: 50,
        accessibility: 50,
        'best-practices': 50,
        seo: 50,
        pwa: 50,
      },
    });
  });

  it('perform web page audit with default matrices, that means 100 criteria for all categories', async () => {
    await playAudit({
      page: page,
      port: 9222,
    });
  });

  it('perform web page audit with HTML lighthouse reports', async () => {
    await playAudit({
      page: page,
      port: 9222,
      thresholds: {
        performance: 50,
        accessibility: 50,
        'best-practices': 50,
        seo: 50,
        pwa: 50,
      },
      htmlReport: true,
      reportDir: `${process.cwd()}/reports`,
    });
  });

  afterAll(async () => {
    await browser.close();
  });
});
