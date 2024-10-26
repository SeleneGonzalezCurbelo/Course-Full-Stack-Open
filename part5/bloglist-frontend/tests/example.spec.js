import { test, expect, request } from '@playwright/test'

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
  test.beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'userPrueba',
        name: 'User Test',
        password: 'prueba'
      }
    })

    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'login' }).click()
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByRole('form', { name: 'loginForm' })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {      
      await page.getByTestId('username').fill('userPrueba')
      await page.getByTestId('password').fill('prueba')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Login successful')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('noprueba')
      await page.getByTestId('password').fill('prueba')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
})

