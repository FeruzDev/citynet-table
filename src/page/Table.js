import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import {API_PATH, TOKEN_NAME} from "../tools/constants";

import {getTableList} from "../redux/actions/tabelAction";

const Table = (props) => {

    useEffect (  () => {
        props.getTableList()

    }, [])


    var days = ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'];
    let  today = new Date(),
        date =  today.getDate(),
        year =  today.getYear(),
        day= days[today.getDay()],
        month = today.getMonth()+1;
     let lastDayOfMonth = new Date(  today.getMonth()+1,    );

    console.log(date)
    console.log(day)
    console.log(month)
    console.log(lastDayOfMonth)


    var getDaysInMonth = function(month,year) {
        // Here January is 1 based
        //Day 0 is the last day in the previous month
        return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
    };
    console.log(getDaysInMonth(month, year));

    const [monthL, setMonthL] = useState([])

    const N = 30;
    const allDays = Array.from({length: N}, (_, index) => index + 1);
    console.log(allDays)
    return (
        <div className="Table">


            <table className='tableList'>

                <tr>
                    <th>FIO</th>
                    <th>Должность</th>
                    {
                        allDays.map(all =>(
                            <th>
                                {
                                    all
                                }
                            </th>
                        ))
                    }
                </tr>
                    {
                        props.tableList.map((item, i) =>(

                            < >
                                <tr>

                                    <th>{item.get_full_name}</th>
                                    <th></th>

                                    <th>{date   }</th>

                                </tr>


                                {
                                    item.children.map((item2, i) =>


                                            <tr>


                                                <td>{item2.get_full_name}</td>
                                                <td>{item2.position_name}  </td>



                                                {/*{*/}
                                                {/*    item2.attendance.length ? (*/}
                                                {/*                item2.attendance.map((item3, i) =>*/}
                                                {/*                    (*/}
                                                {/*                        <td>*/}

                                                {/*                            { item3.working_hours}*/}
                                                {/*                        </td>*/}
                                                {/*                    )*/}

                                                {/*                )*/}
                                                {/*    )*/}

                                                {/*        :*/}

                                                {/*            <td>0</td>*/}

                                                {/*}*/}




                                                {
                                                    allDays.map((nimadir, i) =>(
                                                      <td> {item2.attendance[i] ? item2.attendance[i].working_hours : '0'}</td>

                                                    ))
                                                }



                                            </tr>

                                    )
                                }

                            </>
                        ))
                    }

            </table>


        </div>
    );
};






const mapStateToProps = (state) => {
    return {
        tableList : state.tableList.tableList,

    }
}

export default connect(mapStateToProps, {getTableList})(Table) ;