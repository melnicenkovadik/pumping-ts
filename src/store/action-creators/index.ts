import * as UserActionCreators from './user'
import * as ProgramActionCreators from './trainingProgram'

export default {
    ...ProgramActionCreators,
    ...UserActionCreators
}
