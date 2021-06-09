    import React, {Component} from 'react';
import Navbar from "../component/Navbar";
import    axios  from "axios";
import {TOKEN_NAME} from "../tools/constants";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            workerList: [],

        }
    }


    componentDidMount() {
        axios.get("http://45.9.228.27/api/account/v1/worker-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then((res) =>{
                // this.setState({workerList: res.data})
                console.log(res)
            })
    }

    render() {
        return (
            <div>


                <h1 className="mt-5 text-center text-secondary">   Citynet Table </h1>


            </div>
        );
    }
}

export default Home;