import {UPDATE_STATE} from "../actionTypes/objectsActionType";

const initialState ={
    modalOpen: false,
    modalOpenEdit: false,
    modalOpenEditAgain: false,
    returnOpenModal: false,
    toggleChildrenList: false,

    usersInActive: false,
    accountId: null,
    accountIdForEdit: null,
    accountIdForEditAgain: null,
    userPosition: [],
    userValueObject: {},
    userConstruction: null,
    objList: [],
    selectedChildId: null,
    usersList: [],
    usersListInActive: [],
    usersListAccount: {},
    selectedImage: "",
    selectedIdForDelete: null,
    selectedIdForEdit: null,
    deleteOpenModal: false,
    editOpenModal: false,
    selectedUser: {},
    userCheck: false,

}


export const usersReducer = (state= initialState, action) => {
    switch (action.type){
        case UPDATE_STATE:
            return {...state, ...action.payload}
        default: return state;
    }
}
