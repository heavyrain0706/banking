import { BanksState, BanksAction, BanksActionTypes } from '../types/banks';

const initialState: BanksState = {
    banks: [],
    creditTerm: 24,
    databaseStatus: '',
    banksHistory: []
}

export const banksReducer = (state = initialState, action: BanksAction): BanksState => {
    switch (action.type) {
        case BanksActionTypes.LOAD_BANKS_FROM_DB:
            return { ...state, banks: action.payload }
        case BanksActionTypes.ADD_BANK:
            return { ...state, banks: [...state.banks, action.payload] }
        case BanksActionTypes.SET_DATABASE_STATUS:
            return { ...state, databaseStatus: action.payload}
            case BanksActionTypes.LOAD_BANKS_HISTORY_FROM_DB:
            return { ...state, banksHistory: action.payload}
            case BanksActionTypes.ADD_BANKS_HISTORY:
            return { ...state, banksHistory: [...state.banksHistory, action.payload]}
        default:
            return state
    }
}