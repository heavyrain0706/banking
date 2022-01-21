import { AddBanksHistory } from '../types/banks';
import { IBank } from '../models/IBank';
import { BanksActionTypes, SetDatabaseStatus, LoadBanksFromDB, AddBanks, LoadBanksHistoryFromDB } from '../types/banks';

export const BanksActionCreators = {
    loadBanksFromDB: (payload: IBank[]): LoadBanksFromDB => ({type: BanksActionTypes.LOAD_BANKS_FROM_DB, payload}),
    addBank: (payload: IBank): AddBanks => ({type: BanksActionTypes.ADD_BANK, payload}),
    setDatabaseStatus: (payload: string): SetDatabaseStatus => ({type: BanksActionTypes.SET_DATABASE_STATUS, payload}),
    loadBanksHistoryFromDB: (payload: string []): LoadBanksHistoryFromDB => ({type: BanksActionTypes.LOAD_BANKS_HISTORY_FROM_DB, payload}),
    addBankHistory: (payload: string): AddBanksHistory => ({type: BanksActionTypes.ADD_BANKS_HISTORY, payload})
}