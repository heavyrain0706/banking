import { SetUserAction, SetAuthAction, SetErrorAction, AuthActions } from '../types/auth';
import { AppDispatch } from '../index';
import { IUser } from '../types/IUser';
import UserService from '../../API/UserService';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActions.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActions.SET_AUTH, payload: auth}),
    setError: (payload: string): SetErrorAction => ({type: AuthActions.SET_ERROR, payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            setTimeout(async() => {
                const response = await UserService.getUser()
                const mockUser = response.data.find(user => user.username === username && user.password === password);
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setUser(mockUser));
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('неверные данные'))
                }
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('все пошло не по плану'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
                localStorage.removeItem('auth')
                localStorage.removeItem('username')
                dispatch(AuthActionCreators.setUser({} as IUser))
                dispatch(AuthActionCreators.setIsAuth(false))
    }
}