
import { test, expect } from '@playwright/test';

test.describe('Posts API', () => {
  test('should be able to get all posts', async ({ request }) => {
    console.log('Running test: should be able to get all posts');
    const response = await request.get('https://dummyjson.com/posts');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.posts).toBeInstanceOf(Array);
  });

  test('should be able to get a single post', async ({ request }) => {
    console.log('Running test: should be able to get a single post');
    const response = await request.get('https://dummyjson.com/posts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to add a new post', async ({ request }) => {
    console.log('Running test: should be able to add a new post');
    const response = await request.post('https://dummyjson.com/posts/add', {
      data: {
        title: 'Test Post',
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('Test Post');
  });

  test('should be able to update a post', async ({ request }) => {
    console.log('Running test: should be able to update a post');
    const response = await request.put('https://dummyjson.com/posts/1', {
      data: {
        title: 'Updated Post',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.title).toBe('Updated Post');
  });

  test('should be able to delete a post', async ({ request }) => {
    console.log('Running test: should be able to delete a post');
    const response = await request.delete('https://dummyjson.com/posts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.isDeleted).toBe(true);
  });
});
