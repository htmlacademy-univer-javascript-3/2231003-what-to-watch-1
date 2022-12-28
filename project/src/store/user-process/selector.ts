import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.AuthInfo].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.AuthInfo].authorizationStatus !== AuthorizationStatus.Unknown;
