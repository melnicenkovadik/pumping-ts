import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {trainingProgramReducer} from "./trainingProgramReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    program: trainingProgramReducer
})
export type RootState= ReturnType<typeof rootReducer>
