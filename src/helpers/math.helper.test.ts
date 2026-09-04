import { test, expect, describe } from 'vitest';
import { add, multiply, subtract } from './math.helper';

/* test('should add two positive numbers', () => {
  // ! 1. Arrange
  const a = 1;
  const b = 2;

  // ! 2. Act
  const result = add(a, b);
  console.log({ result });

  //! 3. Assert
  expect(add(1, 2)).toBe(3);
}); */

describe('Add', () => {
  test('should add two positive numbers', () => {
    const a = 1;
    const b = 2;
    const result = add(a, b);
    expect(result).toBe(a + b);
    console.log({ result });
  });
  test('should add two negative numbers', () => {
    const a = -1;
    const b = -2;
    const result = add(a, b);
    expect(result).toBe(a + b);
    console.log({ result });
  });
});

describe('Subtract', () => {
  test('should subtract two positive numbers', () => {
    const a = 1;
    const b = 2;
    const result = subtract(a, b);
    expect(result).toBe(a - b);
    console.log({ result });
  });
  test('should subtract two negative numbers', () => {
    const a = -1;
    const b = -2;
    const result = subtract(a, b);
    expect(result).toBe(a - b);
    console.log({ result });
  });
});

describe('Multiply', () => {
  test('should multiply two positive numbers', () => {
    const a = 1;
    const b = 2;
    const result = multiply(a, b);
    expect(result).toBe(a * b);
    console.log({ result });
  });
  test('should multiply two negative numbers', () => {
    const a = -1;
    const b = -2;
    const result = multiply(a, b);
    expect(result).toBe(a * b);
    console.log({ result });
  });
});
