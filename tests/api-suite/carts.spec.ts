
import { test, expect } from '@playwright/test';

test.describe('Carts API', () => {
  test('should be able to get all carts', async ({ request }) => {
    console.log('Running test: should be able to get all carts');
    const response = await request.get('https://dummyjson.com/carts');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.carts).toBeInstanceOf(Array);
  });

  test('should be able to get a single cart', async ({ request }) => {
    console.log('Running test: should be able to get a single cart');
    const response = await request.get('https://dummyjson.com/carts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to add a new cart', async ({ request }) => {
    console.log('Running test: should be able to add a new cart');
    const response = await request.post('https://dummyjson.com/carts/add', {
      data: {
        userId: 1,
        products: [
          {
            id: 1,
            quantity: 1,
          },
        ],
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.userId).toBe(1);
  });

  test('should be able to update a cart', async ({ request }) => {
    console.log('Running test: should be able to update a cart');
    const response = await request.put('https://dummyjson.com/carts/1', {
      data: {
        products: [
          {
            id: 1,
            quantity: 2,
          },
        ],
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.products[0].quantity).toBe(2);
  });

  test('should be able to delete a cart', async ({ request }) => {
    console.log('Running test: should be able to delete a cart');
    const response = await request.delete('https://dummyjson.com/carts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.isDeleted).toBe(true);
  });
});
