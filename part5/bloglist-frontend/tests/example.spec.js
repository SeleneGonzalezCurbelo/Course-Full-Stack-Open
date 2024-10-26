import { test, expect } from '@playwright/test'

test.describe('playwright', () => {
  test('has title', async ({ page }) => {

    await page.goto('https://playwright.dev/')

    await expect(page).toHaveTitle(/Playwright/)
  })

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/')

    await page.getByRole('link', { name: 'Get started' }).click()

    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
  })
})

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByRole('form', { name: 'loginForm' })).toBeVisible()
  })
})