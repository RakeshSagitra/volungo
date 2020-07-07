import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Launches from './Launches'

describe('<Launches />', () => {
  test('it should mount', () => {
    render(<Launches />)

    const launches = screen.getByTestId('Launches')

    expect(launches).toBeInTheDocument()
  })
})