import {combineReducers} from "redux";
import {loginReducer} from "./loginReducer";

import {appReducer} from "./appReduer";
import {objectsReducer} from "./objectsReducer";
import {usersReducer} from "./usersReducer";
import {AllWorkerReducer} from "./AllWorkerReducer";
import {positionReducer} from "./positionReducer";
import {attendanceReducer} from "./attendanceReducer";
import {tableReducer} from "./tableReducer";

export const rootReducer = combineReducers({
    login: loginReducer,

    objectsList: objectsReducer,

    usersList: usersReducer,

    app: appReducer,

    allWorker: AllWorkerReducer,

    positionList: positionReducer,

    attendanceList: attendanceReducer,

    tableList: tableReducer,

});