import React, {useEffect} from 'react';
import axios from "axios";
import {TOKEN_NAME} from "../tools/constants";

const Test2 = () => {

    const data = {
        "UserInfo":{
            "employeeNo": "881",
            "name":"test881",
            "userType": "normal"
        }
    }


    useEffect(()=> {
        axios.post('http://192.168.1.2/ISAPI/AccessControl/UserInfo/Record?format=json' , data , {headers: {'username' : 'admin', 'password' : '12345678a'}})
        console.log(data)
    },[])



    return (
        <div>
            
        </div>
    );
};

export default Test2;