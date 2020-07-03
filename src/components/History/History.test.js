import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import History from './History';

describe('<History />', () => {
  test('it should mount', () => {
    render(<History />);
    
    const history = screen.getByTestId('History');

    expect(history).toBeInTheDocument();
  });
});