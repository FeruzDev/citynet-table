import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getAllUsers} from "../redux/actions/AllWorkerAction";
import {getAttendanceList, hoursLits} from "../redux/actions/attandanceAction";
import {Button, Select, Table,} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import {getObjects} from "../redux/actions/objectsAction";

const Attendance = (props) => {
    const {Option} = Select;
    const columns = [
        {
            title: 'Ф.И.О',
            dataIndex: 'first_name',
        },
        {
            title: 'Телефонный номер',
            dataIndex: 'phone',
            // sorter: {
            //     compare: (a, b) => a.phone - b.phone,
            //     multiple: 3,
            // },
        },
        {
            title: 'Oбъект',
            dataIndex: '',
            render: (action, record: { id: number }) => {
                return (
                    <>



                        <Select name="working_hours" onChange={postFormCon} style={{width: '150px'}}>
                            <Option></Option>
                            {props.objectsList.map(item => (
                                <Option value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </>
                )
            }
        },
        {
            title: 'Должность',
            dataIndex: 'position_name',
        },
        {
            title: 'Время отработало',
            dataIndex: '',

            render: (action, record: { id: number }) => {
                return (
                    <>

                        {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}

                        <Select name="working_hours" onChange={postForm} style={{width: '80px'}}>
                            <Option></Option>
                            {props.workingHourList.map(item => (
                                <Option value={item.hour}>{item.hour} ч</Option>
                            ))}
                        </Select>
                    </>
                )
            }
        },


        {
            title: 'Действие',
            dataIndex: '',
            key: 'action',
            render: (action, record: { id: number }) => {
                return (
                    <>

                        {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}

                        <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode icon={<PlusOutlined
                            style={{fontSize: '24px', color: "#fff", backgroundColor: "#1F7BBF"}}/>}
                                onClick={() => onEdit(record)}/>
                    </>
                )
            }
        },

    ];


    const [hourSelect, sethourSelect] = useState('')
    const [constructionSelect, setconstructionSelect] = useState('')

    const postForm = (value) => {
        sethourSelect(value);
    }

    const postFormCon = (value) => {
        setconstructionSelect(value);
    }
    const onEdit = (record) => {

        let data = new FormData();

        data.append("working_hours", hourSelect)
        data.append("worker", record.id)
        data.append("construction", constructionSelect)


        console.log('Edit record number', record)

        console.log(data)

        axios.post(API_PATH + "attendance/v1/attendance-list-create/" , data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                console.log(res)
                props.getAttendanceList();

            })


    }


    useEffect(() => {
        props.getAttendanceList()
        props.hoursLits()
        props.getObjects()


    }, [])
    return (
        <div className="Objects">
            <div className="objectHeader">
                <h2>Список рабочих</h2>

            </div>
            <Table columns={columns} dataSource={props.attendanceWorkerList} size="middle"/>

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        attendanceWorkerList: state.attendanceList.attendanceWorkerList,
        objectsList: state.objectsList.objectsList,
        workingHourList: state.attendanceList.workingHourList

    }
}


export default connect(mapStateToProps, {getAttendanceList, hoursLits, getObjects})(Attendance);
