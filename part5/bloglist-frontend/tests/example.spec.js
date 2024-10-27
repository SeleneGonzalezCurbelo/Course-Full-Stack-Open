import { test, expect, request } from '@playwright/test'
import { title } from 'process'

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
      await page.getByTestId('username').fill('noprueba2')
      await page.getByTestId('password').fill('prueba')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
})

test.describe('When logged in', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'userPrueba',
        name: 'User Test',
        password: 'prueba'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'userPrueba2',
        name: 'Other User',
        password: 'prueba'
      }
    })

    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('userPrueba')
    await page.getByTestId('password').fill('prueba')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Login successful')).toBeVisible()

    await page.getByTestId('title').fill('blogPrueba')
    await page.getByTestId('author').fill('Author Test')
    await page.getByTestId('url').fill('http://localhost:5173/')
    await page.getByRole('button', { name: 'create' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await expect(page.getByText('A new blog blogPrueba by Author Test', { exact: true })).toBeVisible()
    await page.waitForTimeout(5000)
    await expect(page.getByText('blogPrueba by Author Test')).toBeVisible()
  })

  test('a blog can be edit', async ({ page }) => {
    await page.waitForTimeout(5000)
    await page.getByRole('button', { name: 'view' }).click()  
    await page.getByRole('button', { name: 'update' }).click()  
    await page.getByTestId('newTitle').fill('blogPruebaaaaa')
    await page.getByRole('button', { name: 'save' }).click()  
    await expect(page.getByText('Blog updated successfully')).toBeVisible()
    await page.waitForTimeout(5000)
    await expect(page.getByText('blogPruebaaaaa')).toBeVisible()
  })

  test('a blog can be delete', async ({ page }) => {
    await page.waitForTimeout(5000)
    await page.getByRole('button', { name: 'view' }).click() 
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toEqual('Are you sure you want to delete this blog?')
      await dialog.accept()
    })
    await page.getByRole('button', { name: 'remove' }).click()  
    await page.waitForTimeout(5000)
    await expect(page.getByText('Blog deleted successfully')).toBeVisible()
  })

  test('only the creator can see the delete button', async ({ page, request }) => {
    await page.getByRole('button', { name: 'logout' }).click()

    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill('userPrueba2')
    await page.getByTestId('password').fill('prueba')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Login successful')).toBeVisible()
    
    await page.waitForTimeout(5000)
    const lastBlog = page.locator('[data-testid="blog-item"]').last()
    await expect(lastBlog.getByRole('button', { name: 'view' })).toBeVisible()
    await lastBlog.getByRole('button', { name: 'view' }).click()
    await page.waitForTimeout(5000)
    await expect(lastBlog.getByRole('button', { name: 'remove' })).not.toBeVisible();
  })
})

