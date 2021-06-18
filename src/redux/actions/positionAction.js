import  axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {UPDATE_STATE} from "../actionTypes/objectsActionType";
import {toast} from "react-toastify";
import {getUsers} from "./usersAction";
import {useState} from "react";

export function updateState (data){
    return {
        type: UPDATE_STATE,
        payload: data
    }
}





export function getPosition(){
    return function (dispatch) {
        axios.get(API_PATH + "position/v1/position-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({positionList: res.data}));

                console.log(res)

            })
    }
}

export function getInActivePosition(){
    return function (dispatch) {
        axios.get(API_PATH + "position/v1/position-inactive-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({positionInActiveList: res.data}));

                console.log(res)

            })
    }
}







export function addPositions(data) {

    return function (dispatch) {

        axios.post(API_PATH + "position/v1/position-create/", data ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{




                toast.success("Успешно добавлен")
                dispatch(getPosition());
                dispatch(updateState({modalOpenPosition: false}));



            })
            .catch(err =>{
                toast.error(err)

            })

    }

}

