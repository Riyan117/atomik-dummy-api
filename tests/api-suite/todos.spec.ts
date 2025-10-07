
import { test, expect } from '@playwright/test';

test.describe('Todos API', () => {
  test('should be able to get all todos', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/todos');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.todos).toBeInstanceOf(Array);
  });

  test('should be able to get a single todo', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/todos/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to add a new todo', async ({ request }) => {
    const response = await request.post('https://dummyjson.com/todos/add', {
      data: {
        todo: 'This is a test todo.',
        completed: false,
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.todo).toBe('This is a test todo.');
  });

  test('should be able to update a todo', async ({ request }) => {
    const response = await request.put('https://dummyjson.com/todos/1', {
      data: {
        completed: true,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.completed).toBe(true);
  });

  test('should be able to delete a todo', async ({ request }) => {
    const response = await request.delete('https://dummyjson.com/todos/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.isDeleted).toBe(true);
  });
});
