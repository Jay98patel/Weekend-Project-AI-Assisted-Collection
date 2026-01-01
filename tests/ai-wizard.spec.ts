import { test, expect } from '@playwright/test'

test('ai wizard happy path', async ({ page }) => {
  await page.goto('/collections/group-gifts/ai?step=input')

  const promptInput = page.getByPlaceholder("I'm collecting a group gift for...")
  await expect(promptInput).toBeVisible()
  await promptInput.fill('Wedding gift for Sarah')
  await promptInput.press('Enter')

  await expect(page.getByTestId('loading-logo')).toBeVisible()
  await expect(page.getByTestId('preview-skeleton')).toBeVisible()

  await expect(page.getByTestId('add-donation')).toBeVisible()
  await page.getByTestId('add-donation').click()
  await expect(page.getByTestId('donation-panel')).toBeVisible()
})
