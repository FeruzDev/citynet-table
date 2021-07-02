import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getTableList , selectedMonth} from "../redux/actions/tabelAction";
import {   getObjects} from "../redux/actions/objectsAction";
import {   getPosition} from "../redux/actions/positionAction";
import {   getReportTableList,selectMonthF, selectObjectF, selectPositionF} from "../redux/actions/reportTableAction";
import {DatePicker, Select, Space} from 'antd';

const ReportTable = (props) => {
    useEffect (  () => {
        props.getReportTableList()

        props.getObjects()
        props.getPosition()

    }, [])

    const {Option} = Select;
    var days = ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'];
    let  today = new Date(),
        date =  today.getDate(),
        year =  today.getYear(),
        day= days[today.getDay()],
        month = today.getMonth()+1;
    let lastDayOfMonth = new Date(  today.getMonth()+1,    );



    const getDaysInMonthForTH = function(month,year) {

        return new Date(year, month, 0).getDate();

    };

    const getDaysInMonth = (month, year) => (new Array(31)).fill('').map((v,i)=>new Date(year,month-1,i+1)).filter(v=>v.getMonth()===month-1)


    console.log(getDaysInMonth(month, year));


    const [reasonT, setReason] = useState('')
    const reasonEvent = (value) =>{

        props.selectPositionF(value)
        props.getReportTableList()

    }


    const reasonEventObject = (value) =>{

        props.selectObjectF(value)


        props.getReportTableList()
    }



    const [monthL, setMonthL] = useState([])


    const allDays = Array.from({length: getDaysInMonthForTH(props.selectMonth.slice(5), year)}, (_, index) => index + 1);




    const getDatePicker = (date, dateString) =>{

        props.selectMonthF(dateString);


        props.getReportTableList()
    }



    return (
        <div className="Table">

            <div className="tableHeader mb-4 mt-3">


                <Space direction="horizontal">

                    <DatePicker onChange={getDatePicker} picker="month" />





                </Space>

                <Select name="reason" onChange={reasonEvent} style={{width: '150px', marginLeft: '30px'}}>
                    <Option></Option>
                    {props.positionList.map(item => (
                        <Option value={item.name}>{item.name} </Option>
                    ))}
                </Select>


                <Select name="reason" onChange={reasonEventObject} style={{width: '150px', marginLeft: '30px'}}>
                    <Option></Option>
                    {props.objectsList.map(item => (
                        <Option value={item.name}>{item.name} </Option>
                    ))}
                </Select>

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


                    {
                    item2.attendance[i2]
                    ?
                    item2.attendance.filter(el => el.date_created.slice(8 , 10 ) == (index + 1))[0] ?
                    item2.attendance.filter(el => el.date_created.slice(8 , 10 ) == (index + 1))[0].working_hours :
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
                    selectMonth : state.tableList.selectMonth,
                    positionList: state.positionList.positionList,
                    objectsList: state.objectsList.objectsList,


    }
}

export default connect(mapStateToProps, {getReportTableList,selectPositionF,selectMonthF, selectObjectF, getObjects, getPosition})(ReportTable) ;

