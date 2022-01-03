import {Dispatch} from "redux";
import {UserAction, UserActionsTypes} from "../../types/user";

export const fetchUser = ({
                              name,
                              email,
                              url
                          }: any) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await dispatch({type: UserActionsTypes.FETCH_USER})
            setTimeout(() => {
                dispatch({
                    type: UserActionsTypes.FETCH_USER_SUCCESS, payload: {
                        name,
                        email,
                        url
                    }
                })
            },2000)

        } catch (e) {
            dispatch({
                type: UserActionsTypes.FETCH_USER_ERROR,
                payload: 'Не удалось авторизироватся! Возможно никогда и не получится...'
            })

        }
    }
}

export const logoutUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await dispatch({type: UserActionsTypes.FETCH_USER})
            setTimeout(() => {
                dispatch({type: UserActionsTypes.FETCH_USER_SUCCESS, payload: null})
            },2000)

        } catch (e) {
            dispatch({
                type: UserActionsTypes.FETCH_USER_ERROR,
                payload: 'Не удалось выйти из аккаунта! Возможно никогда и не получится...'
            })

        }
    }
}
