import {UPDATE_STATE} from "../actionTypes/objectsActionType";

const initialState ={

    positionList: [],
    modalOpen: false,

}
export const positionReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
