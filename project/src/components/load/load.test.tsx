import { render, screen } from '@testing-library/react';
import Load from './load';

describe('Component: Load', () => {
  it('should render correctly', () => {
    render(
      <Load />
    );

    expect(screen.getByText('Данные скачиваются')).toBeInTheDocument();
  });
});
