import { test, expect } from '@playwright/test'

test('primitive use of calculator', async ({ page }) => {
  await page.goto('/')

  await page.locator('#btn_2').click()
  await page.locator('[id="btn_+"]').click()
  await page.locator('#btn_2').click()
  await page.locator('[id="btn_="]').click()

  await expect(page.locator(".calc_input_field")).toHaveText('4 $')
})

test('repeating "equal" after an operation', async ({ page }) => {
  await page.goto('/')

  await page.locator('#btn_5').click()
  await page.locator('[id="btn_-"]').click()
  await page.locator('#btn_1').click()
  await page.locator('[id="btn_="]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('4 $')

  await page.locator('[id="btn_="]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('3 $')

  await page.locator('[id="btn_="]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('2 $')

})

test('storing value to memory', async ({ page }) => {
  await page.goto('/')

  await page.locator('#btn_5').click()
  await page.locator('#btn_0').click()
  await page.locator('[id="btn_÷"]').click()
  await page.locator('#btn_5').click()

  await page.locator('[id="btn_="]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('10 $')
    await page.locator('[id="btn_M+"]').click()

  await page.locator('#btn_2').click()
  await page.locator('#btn_0').click()
  await page.locator('[id="btn_x"]').click()
  
  await page.locator('[id="btn_MR"]').click()
  await page.locator('[id="btn_="]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('200 $')

  await page.locator('[id="btn_-"]').click()
  await page.locator('[id="btn_MC"]').click()
  await page.locator('[id="btn_MR"]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('0 $')
})

test('many operations in a row', async ({ page }) => {
  await page.goto('/')

  await page.locator('#btn_1').click()
  await page.locator('#btn_0').click()
  await page.locator('#btn_0').click()
  await page.locator('[id="btn_÷"]').click()
  await page.locator('#btn_5').click()
  await page.locator('[id="btn_="]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('20 $')

  await page.locator('[id="btn_-"]').click()
  await page.locator('#btn_1').click()
  await page.locator('#btn_0').click()

  await page.locator('[id="btn_x"]').click()
  await page.locator('#btn_1').click()
  await page.locator('#btn_0').click()
  await page.locator('#btn_0').click()

  await page.locator('[id="btn_÷"]').click()
  await page.locator('#btn_5').click()
  await page.locator('#btn_0').click()
  await page.locator('#btn_0').click()
  
  await page.locator('[id="btn_="]').click()
  await expect(page.locator(".calc_input_field")).toHaveText('2 $')


})