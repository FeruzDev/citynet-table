import {UPDATE_STATE} from "../actionTypes/objectsActionType";

const initialState ={

    allWorker: []

}
export const AllWorkerReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
