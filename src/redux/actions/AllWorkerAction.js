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



