import axios from "axios";
import {toast} from "react-toastify";
import {LOGIN} from "../actionTypes/authType";
import {TOKEN_NAME} from "../../tools/constants";




export function loginUser(data, history) {

   return function (dispatch){
       dispatch({
           type: LOGIN
       });

       let data2 = new FormData();
       data2.append("username", data.username);
       data2.append("password", data.password);
       // data2.append("password2", data.password2);
       axios.post(  "http://45.9.228.27/api/account/v1/login/", data2)
           .then((res) => {
               if (res.data.response === "Error"){
                   toast.success("Login yoki parol noto'g'ri");
               } else {
                   localStorage.setItem(TOKEN_NAME, res.data.access);
                   dispatch({type: LOGIN});
                   history.push("/home");
                   window.location.reload(true);
                   console.log(res)
               }

           })
           .catch((error) => {
               toast.error("Xatolik!");
               dispatch({type: LOGIN});
           })
   }

}