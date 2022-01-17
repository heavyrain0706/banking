import { IUser } from './IUser';

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    error: string;
}

export enum AuthActions {
    SET_AUTH = 'SET_AUTH',
    SET_ERROR = 'SET_ERROR',
    SET_USER = 'SET_USER'
}

export interface SetAuthAction {
    type: AuthActions.SET_AUTH;
    payload: boolean;
}

export interface SetErrorAction {
    type: AuthActions.SET_ERROR;
    payload: string;
}

export interface SetUserAction {
    type: AuthActions.SET_USER;
    payload: IUser;
}

export type AuthAction = SetAuthAction | SetErrorAction | SetUserAction