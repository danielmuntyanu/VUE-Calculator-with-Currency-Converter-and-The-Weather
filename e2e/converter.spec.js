import { test, expect } from '@playwright/test'
import sleep from '@/services/sleep'

test('change right side currency', async ({ page }) => {
  await page.goto('/')
  await sleep(2000)

  await expect(page.locator('.conv_input_field')).toContainText('€')

  await page.locator('#rightTicker').click()
  await page.locator('#rightTicker_JPY').click()

  await expect(page.locator('.conv_input_field')).toContainText('¥')
})