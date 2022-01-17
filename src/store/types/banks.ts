import { IBank } from './IBank';

export interface BanksState {
    banks: IBank[];
    creditTerm: number;
    databaseStatus: string;
    banksHistory: string [];
}

export enum BanksActionTypes {
    LOAD_BANKS_FROM_DB = 'LOAD_BANKS_FROM_DB',
    ADD_BANK = 'ADD_BANK',
    SET_DATABASE_STATUS = 'SET_DATABASE_STATUS',
    LOAD_BANKS_HISTORY_FROM_DB = 'LOAD_BANKS_HISTORY_FROM_DB',
    ADD_BANKS_HISTORY = 'ADD_BANKS_HISTORY'
}

export interface LoadBanksFromDB {
    type: BanksActionTypes.LOAD_BANKS_FROM_DB;
    payload: IBank[];
}

export interface AddBanks {
    type: BanksActionTypes.ADD_BANK;
    payload: IBank;
}

export interface SetDatabaseStatus {
    type: BanksActionTypes.SET_DATABASE_STATUS;
    payload: string;
}
export interface LoadBanksHistoryFromDB {
    type: BanksActionTypes.LOAD_BANKS_HISTORY_FROM_DB;
    payload: string [];
}

export interface AddBanksHistory {
    type: BanksActionTypes.ADD_BANKS_HISTORY;
    payload: string;
}

export type BanksAction = LoadBanksFromDB | AddBanks | SetDatabaseStatus | LoadBanksHistoryFromDB | AddBanksHistory
