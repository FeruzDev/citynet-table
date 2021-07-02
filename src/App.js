import React from "react";
import Objects from "./page/Objects";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./Auth/Login";
import PrivateRoute from "./component/PrivateRoute";
import Registration from "./component/Registration";
import Home from "./page/Home";
import {Provider} from "react-redux";
import Users from "./page/Users";
import AllWorker from "./page/AllWorker";
 import TableRep from "./page/TableRep";
import Positions from "./page/Positions";
import Attendance from "./page/Attendance";
import Client from "./page/Client";
import TopNavbar from "./component/TopNavbar";
import Table from "./page/Table";
import DatePicker from "./page/DataPicker";
import Construction from "./page/Construction";
import ReportTable from "./page/ReportTable";


function App() {
  return (
    <div className="p-0 m-0">

        <BrowserRouter>

            {window.location.pathname !== "/" ?
                <>

                    <TopNavbar/>
                    <Navbar />
                </> : ""
            }





            <Switch>
                <Route exact path='/' component={Login}/>


                <PrivateRoute exact path='/registration' component={Registration}/>
                <PrivateRoute exact path='/objects' component={Objects}/>
                <PrivateRoute exact path='/construction' component={Construction}/>
                <PrivateRoute exact path='/users' component={Users}/>
                <PrivateRoute exact path='/home' component={Home} />
                <PrivateRoute exact path='/all-workers' component={AllWorker} />
                <PrivateRoute exact path='/positions' component={Positions} />
                <PrivateRoute exact path='/datepicker' component={DatePicker} />
                <PrivateRoute exact path='/tabelrep' component={TableRep} />
                <PrivateRoute exact path='/report-table' component={ReportTable} />





                <PrivateRoute exact path='/tabel' component={Table} />





                <PrivateRoute exact path='/attendance' component={Attendance} />
                <PrivateRoute exact path='/client' component={Client} />
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
