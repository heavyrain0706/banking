import { AuthActionCreators } from './auth/actionCreators';
import { BanksActionCreators } from './banks/actionCreators';

export const AllActionCreators = {
    ...BanksActionCreators,
    ...AuthActionCreators
}