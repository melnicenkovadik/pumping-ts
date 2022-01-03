import {Dispatch} from "redux";
import {ProgramAction, ProgramActionsTypes} from "../../types/program";

export const fetchProgram = (myProgram: any[]) => {
    return async (dispatch: Dispatch<ProgramAction>) => {
        try {
            await dispatch({type: ProgramActionsTypes.FETCH_PROGRAMS})
            setTimeout(() => {
                dispatch({
                    type: ProgramActionsTypes.FETCH_PROGRAMS__SUCCESS, payload: myProgram
                })
            }, 2000)

        } catch (e) {
            dispatch({
                type: ProgramActionsTypes.FETCH_PROGRAMS__ERROR,
                payload: 'Не удалось загрузить программу тренировок! Возможно никогда и не получится...'
            })

        }
    }
}
