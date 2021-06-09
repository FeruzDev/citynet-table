import {UPDATE_STATE} from "../actionTypes/objectsActionType";

const initialState ={

    attendanceList: [],
    workingHourList: [],
    reasonAllList: [],

}
export const attendanceReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
