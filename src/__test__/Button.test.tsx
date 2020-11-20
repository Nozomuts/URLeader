import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  test('renders Button component', async () => {
    const { getByText } = render(<Button>TEST</Button>);
    expect(getByText('TEST')).toBeInTheDocument();
  });
});
