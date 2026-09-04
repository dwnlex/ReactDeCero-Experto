import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyAwesomeApp } from './MyAwesomeApp';

describe('MyAwesomeApp', () => {
  test('should render the app', () => {
    const { container } = render(<MyAwesomeApp />);

    const h1 = container.querySelector('h1');
    const h3 = container.querySelector('h3');

    expect(h1?.innerHTML).toContain('My Awesome App');
    expect(h3?.innerHTML).toContain('');
  });

  test('should render the app', () => {
    render(<MyAwesomeApp />);
    screen.debug();

    /*     const h1 = screen.getByRole('heading', { level: 1 });
    console.log(h1.innerHTML); */

    const h1 = screen.getByTestId('first-name-tittle');

    expect(h1.innerHTML).toContain('My Awesome App');
  });

  test('should match snapshot', () => {
    const { container } = render(<MyAwesomeApp />);
    expect(container).toMatchSnapshot();
  });
});
