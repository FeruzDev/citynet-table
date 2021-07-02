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


export function selectMonthF(data){
    return function (dispatch ) {
        dispatch(updateState({selectMonth: data}));
    }
}


export function selectPositionF(data){
    return function (dispatch ) {
        dispatch(updateState({selectPosition: data}));
    }
}





export function selectObjectF(data){
    return function (dispatch ) {
        dispatch(updateState({selectObject: data}));
    }
}

export function getReportTableList(data){

    return function (dispatch , getState) {

        axios.get(API_PATH +  `account/v1/worker-table-list/?position=` + getState().tableList.selectPosition + `&construction=` + getState().tableList.selectObject + `&month=`+ getState().tableList.selectMonth.slice(5) + `&year=` +  getState().tableList.selectMonth.slice(0, 4), {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({tableList: res.data}));
                dispatch(updateState({tableListForDate: res.data}));

            })
    }
}

