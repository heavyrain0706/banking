import { IUser } from '../store/types/IUser';
import axios, { AxiosResponse } from 'axios';


export default class UserService {
    static async getUser(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>('./users.json')
    }
}