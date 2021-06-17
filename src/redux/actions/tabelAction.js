import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {updateState} from "./usersAction";

export function getTableList(){

    return function (dispatch) {
        axios.get(API_PATH + "account/v1/worker-table-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                dispatch(updateState({tableList: res.data}));

                console.log(res)

            })
    }
}
