import React from 'react';
import { render } from '@testing-library/react';
import Slideshow from './Slideshow';

test('renders learn react link', () => {
  const { getByText } = render(<Slideshow />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
