import  axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {UPDATE_STATE} from "../actionTypes/objectsActionType";
import {toast} from "react-toastify";
import {getUsers} from "./usersAction";
export function updateState (data){
    return {
        type: UPDATE_STATE,
        payload: data
    }
}








export function getAllUsers(){
    return function (dispatch) {


        axios.get(API_PATH + "account/v1/all-active-workers-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({allWorker: res.data}));
                // dispatch(updateState({userPosition: res.data.position}));
                dispatch(updateState({userConstruction: res.data.construction}));
                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


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


