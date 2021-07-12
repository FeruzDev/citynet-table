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



export function getUsers(){
    return function (dispatch) {
        axios.get(API_PATH + "account/v1/worker-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({usersList: res.data}));
                // dispatch(updateState({userPosition: res.data.position}));
                dispatch(updateState({userConstruction: res.data.construction}));



                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })

    }
}



export function getUsersInActive(){
    return function (dispatch) {
        axios.get(API_PATH + "account/v1/dismissed-workers-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({usersListInActive: res.data}));
                // dispatch(updateState({userPosition: res.data.position}));
                dispatch(updateState({userConstruction: res.data.construction}));

                console.log(res)


                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })

    }
}





export function getObjectsForItem(){

    return function (dispatch) {
        axios.get(API_PATH + "construction/v1/construction-list-active/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({objList: res.data}));
                // dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })
    }




}


export function getUsersPosition(){

    return function (dispatch) {
        axios.get(API_PATH + "position/v1/position-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({userPosition: res.data}));

                console.log(res)

            })
    }
}





export function getUsersValue(){
    return function (dispatch) {
        axios.get(API_PATH + "account/v1/worker-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {

                dispatch(updateState({usersList: res.data}));

                dispatch(updateState({userConstruction: res.data.construction}));



                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })

    }
}





export function saveFile(data){
    return function (dispatch) {
        let image = new FormData();
        image.append("image", data);


        axios.put(API_PATH + "account/v1/worker-detail-update/" + data.accountId + "/", image ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                console.log(res);
                if (res.status === 200){
                    dispatch(updateState({selectedImage: res.data.id}))
                } else {
                    toast.error("Error !!!");
                }
            })
    }
}


export function addUsers(data) {

    return function (dispatch) {

        axios.post(API_PATH + "account/v1/account-register/", data ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{






                toast.success("Успешно добавлен")
                dispatch(getUsers());
                dispatch(updateState({modalOpen: false}));
                dispatch(updateState({accountId: res.data.id}));
                dispatch(updateState({modalOpenEdit: true}));








            })
            .catch(err =>{

                if(err.response.data.username){
                    toast.error(err.response.data.username[0]);

                } if (err.response.data.password){
                    toast.error(err.response.data.password[0]);

                }







            })

    }

}

















export function editUsers(data, props) {

    return function (dispatch) {

        axios.put(API_PATH + "account/v1/worker-detail-update/" + props.accountId + "/", data ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{


                console.log(res)

                // editUser();

                toast.success("Успешно редактировать")
                dispatch(getUsers());

                dispatch(updateState({modalOpenEdit: false}));

            })
            .catch(err =>{
                toast(err)
            })

    }

    }





export function deleteUsers(id) {
    return function (dispatch) {
        axios.delete(API_PATH + "construction/v1/construction-rud/" + id )
            .then(res => {
                if (res.status===200){
                    toast.success("Успешно удалено");
                    dispatch(getUsers());
                    dispatch({type: UPDATE_STATE, payload: {deleteModalOpen: false}})
                }else {
                    toast.error("Ошибка");
                }
            })

    }
}