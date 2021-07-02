import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getAllUsers} from "../redux/actions/AllWorkerAction";
import {getAttendanceList, hoursLits, reasonList} from "../redux/actions/attandanceAction";
import {Button, Select, Table,} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import {getObjects} from "../redux/actions/objectsAction";
import {toast, ToastContainer} from "react-toastify";




const Attendance = (props) => {
    const {Option} = Select;

    const [reasonT, setReason] = useState('')
    const reasonEvent = (value) =>{
        setReason(value)


    }

    const [reasonCon, setreasonContext] = useState('')


    const reasonContext = (e) =>{
        setreasonContext(e.target.value)



    }



    const columns = [
        {
            title: 'Ф.И.О',
            dataIndex: 'first_name',
        },
        {
            title: 'Телефонный номер',
            dataIndex: 'phone',

        },
        {
            title: 'Должность',
            dataIndex: 'position_name',
        },
        {
            title: 'Oбъект',
            dataIndex: '',
            render: (action, record: { id: number }) => {
                return (
                    <>


                                <Select
                                    name="working_hours" onChange={postFormCon} style={{width: '150px'}}
                                    showSearch
                                    placeholder="Поиск..."
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {props.objectsList.map(item => (
                                        <Option value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>

                    </>
                )
            }
        },


        {
            title:  'Время отработало' ,
            dataIndex: '',

            render: (action, record: { id: number }) => {
                return (
                    <>

                                <Select name="working_hours" onChange={postForm} style={{width: '80px'}}>
                                    <Option value={null}></Option>
                                    {props.workingHourList.map(item => (
                                        <Option value={item.hour}>{item.hour} ч</Option>
                                    ))}
                                </Select>

                    </>
                )
            }
        },


        {
            title: 'Причина',
            dataIndex: '',

            render: (action, record: { id: number }) => {
                return (
                    <>
                        <Select name="reason" onChange={reasonEvent} style={{width: '80px'}}>
                            <Option value={null}></Option>
                            {props.reasonAllList.map(item => (
                                <Option value={item.id}>{item.reason} </Option>
                            ))}
                        </Select>
                    </>
                )
            }
        },


        {
            title: 'Причина',
            dataIndex: '',

            render: (action, record: { id: number }) => {
                return (
                    <>
                        <input type='text ' onChange={reasonContext} name='context' />

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

                        <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode icon={<PlusOutlined
                            style={{fontSize: '24px', color: "#fff", backgroundColor: "#1F7BBF"}}/>}
                                onClick={  () => saveData(record)}/>
                    </>
                )
            }
        },

    ];

    const [constructionSelect, setconstructionSelect] = useState('')


    const [hourSelect, sethourSelect] = useState('')


    const postForm = (value) => {


            sethourSelect(value);

    }

    const postFormCon = (value) => {
        setconstructionSelect(value);
    }
    const  saveData =  async(record) => {


            let arr =[];

            arr.push({
                worker: record.id,
                construction: constructionSelect,
                working_hours:    hourSelect ? hourSelect :  sethourSelect(0),
                reason: reasonT,
                context: reasonCon,
        })



            axios.post(API_PATH + "attendance/v1/attendance-list-create/" , arr, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
                .then(res => {
                    toast.success("Успешно добавлен")
                    setReason('')
                    sethourSelect('')
                    setconstructionSelect('')
                    props.getAttendanceList();

                })

    }


    useEffect(() => {
        props.getAttendanceList()
        props.hoursLits()
        props.getObjects()
        props.reasonList()


    }, [])
    return (
        <div className="Objects">
            <div className="objectHeader">
                <h2>Список рабочих</h2>

            </div>
            <Table columns={columns} dataSource={props.attendanceWorkerList} size="middle"/>

            <ToastContainer />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {

        attendanceWorkerList: state.attendanceList.attendanceWorkerList,
        objectsList: state.objectsList.objectsList,
        workingHourList: state.attendanceList.workingHourList,
        reasonAllList: state.attendanceList.reasonAllList,

    }
}


export default connect(mapStateToProps, {getAttendanceList, hoursLits, reasonList,getObjects})(Attendance);
