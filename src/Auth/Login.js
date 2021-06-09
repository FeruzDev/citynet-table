import React, {Component} from 'react';
import {AvForm, AvField} from 'availity-reactstrap-validation';

import {connect} from 'react-redux';

import {loginUser} from '../redux/actions/authAction';
import {ToastContainer} from "react-toastify";

class Login extends Component {
    render() {

        const login = (event, values) => {

            this.props.loginUser(values, this.props.history);

        }

        return (
            <div className="login">


                    <div className="row">
                        <div className="col-md-5">
                            <img src="/img/illus.png" alt=""/>
                        </div>
                        <div className="col-md-7">

                            <div className="loginCard">
                                <h3>Get more things done with Loggin platform.</h3>
                                <p>Access to the most powerfull tool in the entire design and web industry.</p>
                                <AvForm onValidSubmit={login}>
                                    <AvField
                                        name="username"
                                        placeholder="Username"
                                        type="text"
                                        required
                                    />

                                    <AvField
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        required
                                    />


                                    <button type='submit' disabled={this.props.isLoading} className='btn  '> {this.props.isLoading ? <span className='spinner-border spinner-border-sm' /> : ""} Login</button>
                                </AvForm>
                            </div>
                        </div>
                    </div>


                <ToastContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        isLoading: state.login.isLoading
    }
}

export default connect(mapStateToProps, {loginUser})(Login);