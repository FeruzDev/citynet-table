import  axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {UPDATE_STATE} from "../actionTypes/objectsActionType";
import {toast} from "react-toastify";
import {getObjects} from "./objectsAction";
export function updateState (data){
    return {
        type: UPDATE_STATE,
        payload: data
    }
}





export function getAttendanceList(){
    return function (dispatch) {
        axios.get(API_PATH + "account/v1/self-workers-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({attendanceWorkerList: res.data}));

                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })

    }
}




export function hoursLits(){
    return function (dispatch) {
        axios.get(API_PATH + "attendance/v1/working-hour-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({workingHourList: res.data}));

                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })

    }
}


export function reasonList(){
    return function (dispatch) {
        axios.get(API_PATH + "attendance/v1/reason-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({reasonAllList: res.data}));


                dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})


            })

    }
}



export function addAttandance(data, history) {

    return function (dispatch) {

        console.log(data)
        axios.post(API_PATH + "attendance/v1/attendance-list-create/", data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                if (res.status === 200) {
                    toast.success("Успешно добавлен")
                    // dispatch(getObjects());
                    dispatch(getAttendanceList());
                    history.push("/home");

                } else {
                    toast.error(res.message);
                }
            })

    }


}

export function addReasonAttandance(data) {

    return function (dispatch) {

        console.log(data)
        axios.post(API_PATH + "attendance/v1/attendance-list-create/", data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                if (res.status === 200) {
                    toast.success("Успешно добавлен")
                    // dispatch(getObjects());
                    dispatch(getAttendanceList());

                } else {
                    toast.error(res.message);
                }
            })

    }


}




