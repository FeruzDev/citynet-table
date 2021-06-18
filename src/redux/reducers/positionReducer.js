import {UPDATE_STATE} from "../actionTypes/objectsActionType";

const initialState ={

    positionList: [],
    positionInActiveList: [],
    modalOpenPosition: false,
    returnOpenModal: false,
    userValuePositionState : {},
    deleteOpenModal: false,
    editOpenModal: false,
    positionInActive: false,


}
export const positionReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
