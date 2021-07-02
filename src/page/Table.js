import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import { DatePicker, Space } from 'antd';
import {getTableList, selectedMonth} from "../redux/actions/tabelAction";
import {updateState} from "../redux/actions/usersAction";

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

    // console.log(date)
    // console.log(day)
    // console.log(month)
    // console.log( "sdasd" + lastDayOfMonth)


    const getDaysInMonthForTH = function(month,year) {

        return new Date(year, month, 0).getDate();

    };



    const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)



    console.log(getDaysInMonth(month, year));





    const [monthL, setMonthL] = useState([])


    const allDays = Array.from({length: getDaysInMonthForTH(month, year)}, (_, index) => index + 1);
    console.log(allDays)


    const getDatePicker = (date, dateString) =>{

        props.selectedMonth(dateString);
    }


    return (
        <div className="Table">

            <div className="tableHeader mb-4 mt-3">


                <Space direction="horizontal">

                    <DatePicker onChange={() => getDatePicker} picker="month" />


                </Space>
            </div>


            <table className='tableList mt-5'>

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

                    <th>
                        Итоги
                    </th>
                </tr>

                {
                    props.tableList.map((item, i) =>(

                        < >
                            <tr>

                                <th>{item.get_full_name}</th>
                                <th>Staff</th>

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
                                item.children.map((item2, i2) =>


                                    <tr>


                                        <td>{item2.get_full_name}</td>
                                        <td>{item2.position_name}  </td>





                                        {
                                            allDays.map((nimadir, index) =>(

                                                 <td>

                                                    { item2.attendance[i2]
                                                        ?
                                                        item2.attendance.filter(el =>
                                                            el.date_created.slice(8 , 10 ) == (index + 1))[0]
                                                            ?
                                                           <b> {item2.attendance.filter(el => el.date_created.slice(8, 10) == (index + 1))[0].working_hours}</b>
                                                            :
                                                            '0'
                                                        :
                                                        '0'}


                                                </td>

                                            ))
                                        }

                                        <td>
                                            {item2.total} ч
                                        </td>



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
        tableListForDate : state.tableList.tableListForDate,
        selectMonth : state.tableList.selectMonth,

    }
}

export default connect(mapStateToProps, {getTableList, selectedMonth})(Table) ;