import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getAllUsers} from "../redux/actions/AllWorkerAction";
import {getAttendanceList, hoursLits, reasonList, updateState} from "../redux/actions/attandanceAction";
import {Button, Select, Table,} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import {getObjects} from "../redux/actions/objectsAction";
import {toast, ToastContainer} from "react-toastify";




const Attendance = (props) => {
    const {Option} = Select;

    const [reasonT, setReason] = useState('')
    const [show, setShow] = useState(true);
    const reasonEvent = (value, index1) =>{
        setReason(value)

        setconstructionSelect(null);
        sethourSelect(null);
        if(value===null){
            setDis1(null)
            setDis2(null)

        }else{
            setDis1(index1)
            setDis2(index1)

        }


    }



    const [reasonCon, setreasonContext] = useState('')


    const reasonContext = (e) =>{
        setreasonContext(e.target.value)


        // if(value===null){
        //     setDis1(null)
        //     setDis2(null)
        //
        // }else{
        //     setDis1(index1)
        //     setDis2(index1)
        //
        // }


    }





    const [dis, setDis] = useState(false)
    const [dis1, setDis1] = useState(false)
    const [dis2, setDis2] = useState(false)
    const [dis3, setDis3] = useState(null)
    const [dis4, setDis4] = useState(false)



    const [constructionSelect, setconstructionSelect] = useState('')


    const [hourSelect, sethourSelect] = useState('')


    const postForm = (value, index1) => {
            sethourSelect(value);


            if(value===null){
                setDis3(null)
                setDis4(null)

            }else{
                setDis3(index1)
                setDis4(index1)

            }

    }

    const postFormCon = (value, index1) => {
        setconstructionSelect(value);

        if(value===null){
            setDis3(null)
            setDis4(null)

        }else{
            setDis3(index1)
            setDis4(index1)

        }


    }



    const  saveData =  async(record) => {

        setDis(true)

            let arr =[];

            arr.push({
                worker: record,
                construction: constructionSelect,
                working_hours:    hourSelect ? hourSelect :  sethourSelect(0),
                reason: reasonT,
                context: reasonCon,
        })

        if(  constructionSelect == '' &&  hourSelect=='' &&  reasonT=='' && reasonCon=='' ){
           toast.warning ("???????????? ???????? ??????????????????")
            setDis(false)
        }
        else {
            axios.post(API_PATH + "attendance/v1/attendance-list-create/" , arr, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
                .then(res => {
                    toast.success("?????????????? ????????????????")

                    axios.get(API_PATH + "account/v1/self-workers-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
                        .then(res => {

                            if(res.status != 500){
                                setProba(res.data)
                            }
                            else{
                              alert("333")

                            }
                            // dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})
                        })

                    setDis(false)


                })
        }
        //
        // setShow(false);
        // setTimeout(() => {
        //     setShow(true);
        // }, 1);

    }



    const [proba, setProba] = useState([])
    const [proba2, setProba2] = useState(true)
    useEffect(() => {
        // props.getAttendanceList()
        props.hoursLits()
        props.getObjects()
        props.reasonList()




        axios.get(API_PATH + "account/v1/self-workers-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {

                if(res){
                    setProba(res.data)
                }
                else if(res.data.success === false){
                    setProba([])

                }


                // dispatch({type: "CHANGE_LOADING", payload: {pageLoading: false}})
            })



    }, [])
    return (
        <div className="Objects">
            <div className="objectHeader">
                <h2>???????????? ??????????????</h2>

            </div>
            {/*{show*/}
            {/*    ?*/}
            {/*    <Table columns={columns} dataSource={*/}
            {/*        props.attendanceWorkerList ?*/}
            {/*            props.attendanceWorkerList[0]*/}

            {/*        ?*/}
            {/*                props.attendanceWorkerList :[]: []}*/}


            {/*             size="middle"*/}

            {/*    />*/}
            {/* : ""}*/}


           <table className="attendace-table">
                    <thead>
                    <tr>
                        <th>??.??.??</th>
                        <th>???????????????????? ??????????</th>
                        <th>??????????????????</th>
                        <th>O??????????</th>
                        <th>?????????? ????????????????????</th>
                        <th>??????????????</th>
                        <th>??????????????</th>
                        <th>????????????????</th>
                    </tr>
                    </thead>

                    <tbody>
                    {


                        proba2 ? (
                        proba.map((item, index1) => (
                            <tr key={index1}>

                                <td>
                                    {item.last_name} {item.first_name} {item.middle_name}

                                </td>


                                <td>{item.phone}</td>
                                <td>{item.position_name}</td>

                                <td>


                                    <Select
                                        disabled={dis1 === index1 ? true : false}

                                        name="construction"
                                        onChange={(value) => postFormCon(value, index1)}
                                        style={{width: '150px', textAlign: "left"}}

                                    >

                                        <Option value={null}></Option>

                                        {props.objectsList.map((item, index) => (
                                            <Option value={item.id}>{item.name} {item.index}</Option>
                                        ))}
                                    </Select>
                                </td>


                                <td>
                                    <Select name="working_hours"
                                            disabled={dis2 === index1 ? true : false}


                                            onChange={(value) => postForm(value, index1)}
                                            style={{width: '80px'}}>
                                        <Option value={null}></Option>
                                        {props.workingHourList.map((item, index) => (
                                            <Option value={item.hour}>{item.hour} ?? </Option>
                                        ))}
                                    </Select>
                                </td>


                                <td>
                                    <Select
                                        name="reason"
                                        onChange={(value) => reasonEvent(value, index1)}
                                        style={{width: '180px'}}
                                        disabled={(dis3 === index1 && dis4 === index1) ? true : false}
                                    >
                                        <Option value={null}></Option>
                                        {props.reasonAllList.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.reason} </Option>
                                        ))}
                                    </Select></td>
                                <td>
                                    <input type='text '
                                           disabled={(dis3 === index1 && dis4 === index1) ? true : false}
                                           onChange={reasonContext}
                                           name='context'/></td>


                                <td>
                                    <Button className="border-0  pl-1 pr-1 text-secondary" disabled={dis} ReactNode
                                            icon={<PlusOutlined
                                                style={{fontSize: '24px', color: "#fff", backgroundColor: "#1F7BBF"}}/>}
                                            onClick={() => (dis1 === index1 || dis2 === index1 || dis3 === index1 || dis4 === index1) ? saveData(item.id) : toast.warning("???????????? ???????? ??????????????????")}/>

                                </td>
                            </tr>


                        ))
                        )


                            :



                            ''
                    }
                    </tbody>
                </table>






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
