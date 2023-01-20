import {useRef, FormEvent, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthData} from '../../types/auth-data';
import {loginAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/selector';

function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, []);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isPasswordValid = () => (
    passwordRef.current !== null &&
    passwordRef.current.value.length > 1 &&
    passwordRef.current.value.match(/(?=.*\d)(?=.*[A-Za-z])./g) !== null
  );
  const isLoginValid = () =>
    loginRef.current !== null
    && loginRef.current.value.length > 0
    && loginRef.current.value.includes('@');

  const dispatch = useAppDispatch();
  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && isPasswordValid() && isLoginValid()) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };
  if (authorizationStatus === AuthorizationStatus.Auth) {
    navigate(AppRoute.Root);
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" data-testid='email' ref={loginRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" data-testid='password' ref={passwordRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default SignIn;
