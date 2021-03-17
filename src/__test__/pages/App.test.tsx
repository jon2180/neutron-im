import React from 'react';
import { render } from '@testing-library/react';
import App from '@/pages/App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/官网首页/i);
  expect(linkElement).toBeInTheDocument();
});
