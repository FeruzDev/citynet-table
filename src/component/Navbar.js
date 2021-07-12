import React from 'react';
import {Link} from "react-router-dom";
import {TOKEN_NAME, TOKEN_NAME_ROLL} from "../tools/constants";

const Navbar = () => {
    return (
        <div className="Navbar container-fluid ">
            <nav className="navbar navbar-expand-lg">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav w-100 align-items-center">
                        {
                            localStorage.getItem(TOKEN_NAME_ROLL) == "staff" ?

                              <>
                                  <li className="nav-item">
                                      <Link to='/attendance'  className="nav-link"  >Посещаемость</Link>
                                  </li>
                                  <li className="nav-item dropdown">
                                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Табели
                                      </a>
                                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                          <Link className="dropdown-item" to="/tabel" >Табель</Link>
                                          <a className="dropdown-item" href="#">Табель (Неактивный)</a>

                                      </div>
                                  </li>
                                  <li className="nav-item">
                                      {/*<Link to='/client'  className="nav-link"  >Client</Link>*/}
                                  </li></>

                            :
                                localStorage.getItem(TOKEN_NAME_ROLL) == "superuser" ?

                                    <>
                                        <li className="nav-item active">
                                            <Link to="/home" className="nav-link" href="#">Главная <span className="sr-only">(current)</span></Link>
                                        </li>

                                        {/*<li className="nav-item">*/}
                                        {/*    <Link to="/objects" className="nav-link" href="#">Объекты</Link>*/}
                                        {/*</li>*/}

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Объект
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="/objects" >Блоки</Link>
                                                <Link className="dropdown-item" to="/construction">Объект</Link>

                                            </div>
                                        </li>



                                        <li className="nav-item">
                                            <Link to="/users" className="nav-link" href="#">Состав бригад</Link>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Табели
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="/tabel" >Табель</Link>
                                                <a className="dropdown-item" href="#">Табель (Неактивный)</a>

                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Отчеты
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to='report-table'>Отчеты</Link>
                                                <Link className="dropdown-item">Отчеты 2 (все)</Link>
                                                <a className="dropdown-item" href="#">Отчет за каждый день</a>

                                            </div>
                                        </li>



                                        <li className="nav-item">
                                            <Link className="nav-link"  to='/all-workers'>Все сотрудники</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to='/positions'  className="nav-link"  >Должность</Link>
                                        </li>



                                        <li className="nav-item">
                                            <Link to='/test'  className="nav-link"  >TEST</Link>
                                        </li>
                                    </>


                                    :
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Табели
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link className="dropdown-item" to="/tabel" >Табель</Link>
                                            <a className="dropdown-item" href="#">Табель (Неактивный)</a>

                                        </div>
                                    </li>

                        }




                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;