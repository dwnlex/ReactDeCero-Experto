import { describe, expect, test } from 'vitest';
import ItemCounter from './ItemCounter';
import { render, screen } from '@testing-library/react';

describe('ItemCounter', () => {
  test('should first', () => {
    const name = 'Test item';

    render(<ItemCounter name={name} />);

    expect(screen.getByText('Test item')).toBeDefined();
    expect(screen.getByText('Test item')).not.toBeNull();
  });

  test('should render with custom quantity', () => {
    const name = 'Test item';
    const quantity = 10;

    render(<ItemCounter name={name} quantity={quantity} />);

    expect(screen.getByText(quantity)).toBeDefined();

  });
});
