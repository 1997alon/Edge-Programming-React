const { test, expect } = require('@playwright/test');

test('theme', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.locator('button.change_theme')).toBeVisible()
});

test('change theme', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await expect(page.locator('button.change_theme')).toBeVisible();
  
    await page.click('button.change_theme');
  
    const backgroundColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(backgroundColor).toBe('rgba(0, 0, 0, 0)'); 
  });


  test('user', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await expect(page.locator('button.create_user_form')).toBeVisible();
  
  });

test('login', async ({ page }) => {
    await page.goto('http://localhost:3000');
  
    await expect(page.locator('button.login_form')).toBeVisible();
  
  });

test('create user', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.click('button.create_user_form');
  
    await page.fill('input[name="create_user_form_name"]', 'dd');
    await page.fill('input[name="create_user_form_email"]', 'dd@dd.com');
    await page.fill('input[name="create_user_form_username"]', 'dd');
    await page.fill('input[name="create_user_form_password"]', 'dd');
  
    await page.click('button[name="create_user_form_create_user"]');
    

  });

