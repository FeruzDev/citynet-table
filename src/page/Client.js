import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    getAttendanceList,
    hoursLits,
    reasonList,
    addAttandance,
    addReasonAttandance
} from "../redux/actions/attandanceAction";
import {getObjects} from "../redux/actions/objectsAction";
import {Select} from "antd";
import { AvForm, AvField , AvCheckbox, AvCheckboxGroup} from 'availity-reactstrap-validation';
import {ToastContainer} from "react-toastify";

const Client = (props) => {
    let  today = new Date(),
        date =    today.getFullYear()  + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const {Option} = Select;

    useEffect(() => {
        props.hoursLits()
        props.getObjects()
        props.reasonList()
        props.getAttendanceList()

    }, [])

    const [reasonT, setReason] = useState('')

    const saveAttandance = (e, values) => {

        let arr = [];
        for (let i = 0; i < props.attendanceWorkerList.length; i++) {
            if (values.worker[i] >= 0){
                arr.push({
                    worker: values.worker[i][0],
                    construction: values.construction[i],
                    working_hours: values.working_hours[i],
                    reason: values.reason[i],
                    context: values.context[i],
                })
            }
        }
        props.addAttandance(arr, props.history);

        props.getAttendanceList()

    }




    const saveAttandanceReason = (e, values) => {
        let arr = [];
        for (let i = 0; i < props.attendanceWorkerList.length; i++) {
            if (values.worker[i] > 0){
                arr.push({
                    worker: values.worker[i][0],
                    reason: values.reason[i],
                    context: values.context[i],
                })
            }
        }
        props.addReasonAttandance(arr);

        arr= null
        props.getAttendanceList()
    }




    const reasonEvent = (e) =>{
        setReason(e)
    }

    return (
        <div className = "Client">
            <h5>Сегодня дата: {date}</h5>

            <h4 className='mt-3'>Выберите рабочих которые сегодня работали:</h4>


            <AvForm onValidSubmit={saveAttandance} >
                <div className="">

                    {
                        props.attendanceWorkerList?.map((item, i) => (


                            <div className="attendenceCard">


                                <div className="row pl-3 w-25">

                                    <AvCheckboxGroup name={'worker[' + i + ']'}  >
                                        <AvCheckbox value={item.id} />
                                    </AvCheckboxGroup>

                                    <h5>{item.first_name}  {item.last_name}  {item.middle_name} </h5>

                                </div>


                                {
                                    reasonT === i ? '' :
                                        <>

                                            <div>
                                                <h6>Выберите объект:</h6>
                                                <AvField type='select'  name={'construction[' + i + ']'}  style={{width: '200px'}}  >
                                                    <option></option>
                                                    { props.objectsList.map((item2, i) => (
                                                        <option key={i} value={item2.id}>{item2.name}  </option>
                                                    ))}
                                                </AvField>

                                            </div>


                                            <div>
                                                <h6>Выберите сколько часов работал:</h6>

                                                <AvField type='select' name={'working_hours[' + i  + ']'}  style={{width: '80px'}}  >

                                                    <option></option>
                                                    { props.workingHourList.map((item2, i) => (
                                                        <option key={i} value={item2.hour}>{item2.hour} ч</option>
                                                    ))}
                                                </AvField>

                                            </div>
                                        </>
                                }




                                <div>
                                    <h6>Причина</h6>

                                    <div className='d-flex'>
                                        <AvField type='select' onChange={() => reasonEvent(i)} className='mr-5' name={'reason[' + i + ']'}  style={{width: '150px'}}  >
                                            <option ></option>
                                            { props.reasonAllList.map(item3 => (
                                                <option value={item3.id}>{item3.reason} </option>
                                            ))}
                                        </AvField>

                                        {
                                            (
                                                reasonT === i
                                                    ?
                                                    <AvField type='textarea ' name={'context[' + i + ']'} style={{height: "70px"}} />

                                                    :
                                                    ''
                                            )
                                        }
                                    </div>
                                </div>


                            </div>




                        ))
                    }
                </div>

                <button   className='btn addObject mt-4 btn-primary' type='submit'>Сохранить</button>

            </AvForm>
            <ToastContainer/>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        attendanceWorkerList: state.attendanceList.attendanceWorkerList,
        workingHourList: state.attendanceList.workingHourList,
        reasonAllList: state.attendanceList.reasonAllList,
        objectsList: state.objectsList.objectsList,

    }
}


export default connect(mapStateToProps, {getAttendanceList, getObjects, reasonList, hoursLits, addReasonAttandance, addAttandance})(Client);
