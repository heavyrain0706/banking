import { AuthState, AuthAction, AuthActions } from '../types/auth';
import { IUser } from '../types/IUser';


const initialState: AuthState = {
    isAuth: false,
    error: '',
    user: {} as IUser
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch(action.type) {
        case AuthActions.SET_AUTH:
            return { ...state, isAuth: action.payload}
        case AuthActions.SET_USER:
            return { ...state, user: action.payload }
        case AuthActions.SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}