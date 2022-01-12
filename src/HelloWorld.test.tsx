import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HelloWorld from './HelloWorld';

describe('app', () => {
  test('hello world', () => {
    const { getByText } = render(<HelloWorld />);

    expect(getByText('Hello world!')).toBeInTheDocument();
  });
});
