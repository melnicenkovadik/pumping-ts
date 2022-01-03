import {ProgramActionsTypes, ProgramAction, ProgramState} from "../../types/program";

const initialState: ProgramState = {
    program: [],
    loading: false,
    error: null,
}
export const trainingProgramReducer = (state = initialState, action: ProgramAction): ProgramState => {
    switch (action.type) {
        case ProgramActionsTypes.FETCH_PROGRAMS: {
            return {...state, loading: true}
        }
        case ProgramActionsTypes.FETCH_PROGRAMS__SUCCESS: {
            console.log('action.payload', action.payload);
            return {...state, loading: false, error: null, program: action.payload}
        }
        case ProgramActionsTypes.FETCH_PROGRAMS__ERROR: {
            return {...state, loading: true, error: action.payload, program: []}
        }
        default: {
            return state
        }
    }
}
