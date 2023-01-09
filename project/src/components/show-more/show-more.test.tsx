import { render, screen } from '@testing-library/react';
import ShowMore from './show-more';

describe('Component: ShowMore', () => {
  it('should render correctly', () => {
    render(
      <ShowMore onClick={jest.fn()}/>
    );

    expect(screen.getByText('Show more')).toBeInTheDocument();
  });
});
