import React from 'react';
import { Button } from '../components/Button';
import { renderStyled } from './helper';

describe('Button', () => {
  test('renders Button component', async () => {
    const { getByText } = renderStyled(<Button>TEST</Button>);
    expect(getByText('TEST')).toBeInTheDocument();
  });
});
