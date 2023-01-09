import HistoryRouter from '../../components/history/history';
import Footer from './footer';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

describe('Component: Footer', () => {
  const history = createMemoryHistory();

  it('should render Footer', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>
    );

    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
