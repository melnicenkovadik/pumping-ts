export interface ProgramState {
    program: any[];
    loading: boolean;
    error: null | string
}

export enum ProgramActionsTypes {
    FETCH_PROGRAMS = 'FETCH_PROGRAMS',
    FETCH_PROGRAMS__SUCCESS = 'FETCH_PROGRAMS__SUCCESS',
    FETCH_PROGRAMS__ERROR = 'FETCH_PROGRAMS__ERROR'
}

interface FetchProgramAction {
    type: ProgramActionsTypes.FETCH_PROGRAMS
}

interface FetchProgramSuccessAction {
    type: ProgramActionsTypes.FETCH_PROGRAMS__SUCCESS,
    payload: any[]
}

interface FetchProgramErrorAction {
    type: ProgramActionsTypes.FETCH_PROGRAMS__ERROR,
    payload: string
}

export type ProgramAction = FetchProgramAction |
    FetchProgramSuccessAction |
    FetchProgramErrorAction
