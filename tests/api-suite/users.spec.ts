
import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  test('should be able to get all users', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/users');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.users).toBeInstanceOf(Array);
  });

  test('should be able to get a single user', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/users/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to add a new user', async ({ request }) => {
    const response = await request.post('https://dummyjson.com/users/add', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.firstName).toBe('John');
  });

  test('should be able to update a user', async ({ request }) => {
    const response = await request.put('https://dummyjson.com/users/1', {
      data: {
        firstName: 'Jane',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.firstName).toBe('Jane');
  });

  test('should be able to delete a user', async ({ request }) => {
    const response = await request.delete('https://dummyjson.com/users/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.isDeleted).toBe(true);
  });
});
