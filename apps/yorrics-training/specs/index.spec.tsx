import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '../pages/index';
import '@testing-library/jest-dom'

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });

  it('should show company description', () => {
    render(<Index />);
    const apply = screen.getByText('Yorrics Training is a world-class agency, providing training on marketing skills for your company.').closest('h2')
    expect(apply).toBeVisible()
  });

  it('should show Apply button', () => {
    render(<Index />);
    const apply = screen.getByText('Apply').closest('a')
    expect(apply).toBeVisible()
  });
});
