import SignIn from './sign-in-screen';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history/history';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();


const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  }
});

describe('Component: SignInScreen', () => {
  it('should render "SignInScreen" when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    await userEvent.type(screen.getByTestId('email'), 'kek@l.ks');
    await userEvent.type(screen.getByTestId('password'), '123456');
    expect(screen.getByDisplayValue(/kek@l.ks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
