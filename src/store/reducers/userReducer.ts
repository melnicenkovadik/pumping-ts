import {UserAction, UserActionsTypes, UserState} from "../../types/user";

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
    isAuth: false,
}
export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionsTypes.FETCH_USER: {
            return {loading: true, error: null, user: null, isAuth: false}
        }
        case UserActionsTypes.FETCH_USER_SUCCESS: {
            console.log('action.payload', action.payload);
            return {loading: false, error: null, user: action.payload, isAuth: true}
        }
        case UserActionsTypes.FETCH_USER_ERROR: {
            return {loading: true, error: action.payload, user: null, isAuth: false}
        }
        default: {
            return state
        }
    }
}
