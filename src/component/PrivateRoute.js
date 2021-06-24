import React from 'react';

import {Route, Redirect} from 'react-router-dom'

import {TOKEN_NAME, TOKEN_NAME_ROLL} from "../tools/constants";
import NotFound from "./NotFound";
import {adminPages, allWorkerPage, StaffPages, workerPages} from "../tools/routes";

const PrivateRoute = (props) => {
    return (
        localStorage.getItem(TOKEN_NAME) ?
            adminPages.includes(props.path) && localStorage.getItem(TOKEN_NAME_ROLL) === "superuser" ?
                <Route component={props.component} path={props.path} exact={props.exact}/> :
                StaffPages.includes(props.path) && localStorage.getItem(TOKEN_NAME_ROLL) === "staff" ?
                    <Route component={props.component} path={props.path} exact={props.exact}/> :
                    workerPages.includes(props.path) && localStorage.getItem(TOKEN_NAME_ROLL) === "worker" ?
                        <Route component={props.component} path={props.path} exact={props.exact}/> :
                    allWorkerPage.includes(props.path) ? <Route component={props.component} path={props.path} exact={props.exact}/> :
                        <Route component={NotFound}/> : <Route component={NotFound}/>
        // : <Redirect to="/login"/>
    );
};

export default PrivateRoute;