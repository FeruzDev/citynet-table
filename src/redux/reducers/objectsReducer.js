import {UPDATE_STATE} from "../actionTypes/objectsActionType";

const initialState ={
    modalOpen: false,
    objectsList: [],
    objectsInActiveList: [],
    objectsInActive: false,
    selectedImage: "",
    selectedIdForDelete: null,
    selectedIdForEdit: null,
    deleteOpenModal: false,
    returnOpenModal: false,
    editOpenModal: false,

    selectedObject: {},

}
export const objectsReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
