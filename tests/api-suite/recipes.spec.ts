
import { test, expect } from '@playwright/test';

test.describe('Recipes API', () => {
  test('should be able to get all recipes', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/recipes');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.recipes).toBeInstanceOf(Array);
  });

  test('should be able to get a single recipe', async ({ request }) => {
    const response = await request.get('https://dummyjson.com/recipes/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.id).toBe(1);
  });

  test('should be able to add a new recipe', async ({ request }) => {
    const response = await request.post('https://dummyjson.com/recipes/add', {
      data: {
        name: 'Test Recipe',
        ingredients: ['Test Ingredient'],
        instructions: ['Test Instruction'],
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Test Recipe');
  });

  test('should be able to update a recipe', async ({ request }) => {
    const response = await request.put('https://dummyjson.com/recipes/1', {
      data: {
        name: 'Updated Recipe',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Updated Recipe');
  });

  test('should be able to delete a recipe', async ({ request }) => {
    const response = await request.delete('https://dummyjson.com/recipes/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.isDeleted).toBe(true);
  });
});
