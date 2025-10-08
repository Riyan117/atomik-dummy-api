
import { test, expect } from '@playwright/test';

test.describe('Comments API', () => {
  test('should be able to get all comments', async ({ request }) => {
    console.log('Running test: should be able to get all comments');
    const response = await request.get('https://dummyjson.com/comments');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.comments).toBeInstanceOf(Array);
  });

  test('should be able to get a single comment', async ({ request }) => {
    console.log('Running test: should be able to get a single comment');
    const response = await request.get('https://dummyjson.com/comments/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to add a new comment', async ({ request }) => {
    console.log('Running test: should be able to add a new comment');
    const response = await request.post('https://dummyjson.com/comments/add', {
      data: {
        body: 'This is a test comment.',
        postId: 1,
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.body).toBe('This is a test comment.');
  });

  test('should be able to update a comment', async ({ request }) => {
    console.log('Running test: should be able to update a comment');
    const response = await request.put('https://dummyjson.com/comments/1', {
      data: {
        body: 'This is an updated comment.',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.body).toBe('This is an updated comment.');
  });

  test('should be able to delete a comment', async ({ request }) => {
    console.log('Running test: should be able to delete a comment');
    const response = await request.delete('https://dummyjson.com/comments/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.isDeleted).toBe(true);
  });
});
