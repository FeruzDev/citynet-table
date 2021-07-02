import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {updateState} from "./usersAction";

export function getTableList(month){

    return function (dispatch) {
        axios.get(API_PATH + "account/v1/worker-table-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({tableList: res.data}));
                dispatch(updateState({tableListForDate: res.data}));

                console.log(res)

            })
    }
}




export function selectedMonth(data){
    return function (dispatch){
        dispatch(updateState({selectMonth: data}));
        //

        axios.get(API_PATH + `account/v1/worker-table-list ` , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({tableList: res.data}));
                dispatch(updateState({tableListForDate: res.data}));

                console.log(res)

            })



        console.log(selectedMonth)
        console.log('keldi')
    }
}

