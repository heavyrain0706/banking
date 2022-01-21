import axios, { AxiosResponse } from 'axios';
import { IUser } from '../store/models/IUser';


export default class UserService {
    static async getUser(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>('./users.json')
    }
}