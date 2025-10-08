
import { test, expect } from '@playwright/test';

test.describe('Quotes API', () => {
  test('should be able to get all quotes', async ({ request }) => {
    console.log('Running test: should be able to get all quotes');
    const response = await request.get('https://dummyjson.com/quotes');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.quotes).toBeInstanceOf(Array);
  });

  test('should be able to get a single quote', async ({ request }) => {
    console.log('Running test: should be able to get a single quote');
    const response = await request.get('https://dummyjson.com/quotes/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to get a random quote', async ({ request }) => {
    console.log('Running test: should be able to get a random quote');
    const response = await request.get('https://dummyjson.com/quotes/random');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
  });
});
