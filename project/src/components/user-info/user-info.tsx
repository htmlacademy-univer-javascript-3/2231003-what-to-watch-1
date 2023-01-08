import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {APIRoute, AuthorizationStatus} from '../../const';
import {logoutAction} from '../../store/api-actions';
import {getAuthorizationStatus, getUserData} from '../../store/user-process/selector';


const UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUserData);
  const dispatch = useAppDispatch();

  const signOutClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <Link to='/login' className='user-block__link'>Sign in</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={user?.avatarUrl} alt="User avatar" width="63" height="63" onClick={() => navigate(APIRoute.MyList)}/>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={signOutClickHandler}>Sign out</a>
      </li>
    </ul>
  );
};

export default UserInfo;
