import { banksReducer } from './banks/banksReducer';
import authReducer from "./auth/authReducer";


export default {
    auth: authReducer,
    banks: banksReducer
}