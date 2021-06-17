import {UPDATE_STATE} from "../actionTypes/objectsActionType";

const initialState ={

    tableList: [],



}
export const tableReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}