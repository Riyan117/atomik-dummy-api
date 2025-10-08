
import { test, expect } from '@playwright/test';

test.describe('Products API', () => {
  test('should be able to get all products', async ({ request }) => {
    console.log('Running test: should be able to get all products');
    const response = await request.get('https://dummyjson.com/products');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.products).toBeInstanceOf(Array);
  });

  test('should be able to get a single product', async ({ request }) => {
    console.log('Running test: should be able to get a single product');
    const response = await request.get('https://dummyjson.com/products/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to add a new product', async ({ request }) => {
    console.log('Running test: should be able to add a new product');
    const response = await request.post('https://dummyjson.com/products/add', {
      data: {
        title: 'BMW Pencil',
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('BMW Pencil');
  });

  test('should be able to update a product', async ({ request }) => {
    console.log('Running test: should be able to update a product');
    const response = await request.put('https://dummyjson.com/products/1', {
      data: {
        title: 'iPhone 15',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('iPhone 15');
  });

  test('should be able to delete a product', async ({ request }) => {
    console.log('Running test: should be able to delete a product');
    const response = await request.delete('https://dummyjson.com/products/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.isDeleted).toBe(true);
  });
});
