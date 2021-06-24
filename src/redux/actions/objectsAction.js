import  axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {UPDATE_STATE} from "../actionTypes/objectsActionType";
import {toast} from "react-toastify";
export function updateState (data){
    return {
        type: UPDATE_STATE,
        payload: data
    }
}

export function getObjects(){
    return function (dispatch) {
        axios.get(API_PATH + "construction/v1/construction-list-active/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({objectsList: res.data}));
                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })
    }
}


export function getInActiveObjects(){
    return function (dispatch) {
        axios.get(API_PATH + "construction/v1/construction-list-inactive/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({objectsInActiveList: res.data}));
                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })
    }
}


export function getInActiveConstruction(){
    return function (dispatch) {
        axios.get(API_PATH + "construction/v1/object-list-inactive/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({constructionInActiveList: res.data}));
                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })
    }
}




export function getConstruction(){
    return function (dispatch) {
        axios.get(API_PATH + "construction/v1/object-list-active/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({constructionList: res.data}));
                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })
    }
}


export function addObjects(data) {

return function (dispatch) {

axios.post(API_PATH + "construction/v1/construction-create/", data ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
    .then(res =>{
        console.log(res)
        if (res.status === 201){
            toast.success("Успешно добавлен")
            dispatch(getObjects());
            dispatch(updateState({modalOpen: false}));
        } else {
            toast.error(res.message);
        }
    })

}

}


export function addConstruction(data) {

    return function (dispatch) {

        axios.post(API_PATH + "construction/v1/object-create/", data ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                console.log(res)
                if (res.status === 201){
                    toast.success("Успешно добавлен")
                    dispatch(getConstruction());
                    dispatch(updateState({modalOpenConstruction: false}));
                } else {
                    toast.error(res.message);
                }
            })

    }

}



export function editObject(data) {
    return function (dispatch) {
        axios.put(API_PATH + "construction/v1/construction-rud/" + data.id, data)
            .then(res => {
                console.log(res)
            })

        console.log(data)
    }

}



export function deleteObject(id) {
    return function (dispatch) {
        axios.delete(API_PATH + "construction/v1/construction-rud/" + id )
            .then(res => {
                if (res.status===200){
                    toast.success("Успешно удалено");
                    dispatch(getObjects());
                    dispatch({type: UPDATE_STATE, payload: {deleteModalOpen: false}})
                }else {
                    toast.error("Ошибка");
                }
            })

    }
}