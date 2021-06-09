
import React, {Component} from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TOKEN_NAME} from "../tools/constants";
import {AvField, AvForm} from "availity-reactstrap-validation";



class Registration extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            password2: '',
            serPosts: [],
            posts: []
        }
    }



    postForm = (e) =>{
        console.log(e.target.value)

        this.setState({[e.target.name]: e.target.value})
    }
    postFile = (e) => {
        this.setState({file: e.target.files[0]});
    }
    submitPost = e =>{
        e.preventDefault()
        console.log(this.state)
        let data = new FormData();
        data.append("username", this.state.username)
        data.append("password", this.state.password)
        data.append("password2", this.state.password2)


        const { password, password2 } = this.state;
        // perform all neccassary validations
        if (password !== password2) {

            toast.error("Passwords don't match");
        }
        else {
            axios.post(  'http://45.9.228.27/tabel/api/account/v1/account-register/', data  )
                .then(res=>{
                    console.log(res);
                    this.props.history.push('/login')

                    if (res.status === 200){
                        toast.success("You have successfully registered")
                        this.props.history.push('/login')
                    } else {
                        toast.error("Error");
                    }
                })


                .catch(error => {
                    console.log(error)
                })

        }




        this.setState({
            username: '',
            password: '',
            password2: '',

        });

    }


    render() {
        const {username, password, password2 } = this.state
        return (







                <div className="login">


                    <div className="row">
                        <div className="col-md-5">
                            <img src="/img/graphic1.svg" alt=""/>
                        </div>
                        <div className="col-md-7">

                            <div className="loginCard">
                                <h3>Get more things done with Loggin platform.</h3>
                                <p>Access to the most powerfull tool in the entire design and web industry.</p>
                                <form  onSubmit={this.submitPost}>



                                                <input
                                                    onChange={this.postForm}
                                                    type="text"
                                                    placeholder="Username"
                                                    value={username}
                                                    name="username"
                                                    className="form-control"/>







                                        <input
                                            onChange={this.postForm}
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            className="form-control"/>

                                        <input
                                            onChange={this.postForm}
                                            type="password"
                                            placeholder="Verify your Password"
                                            name="password2"
                                            value={password2}
                                            className="form-control"/>




                                    <button type="submit" className="btn   ">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <ToastContainer />




                </div>

        );
    }
}

export default Registration;