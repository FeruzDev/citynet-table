import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getAttendanceList, hoursLits, reasonList, addAttandance} from "../redux/actions/attandanceAction";
import {getObjects} from "../redux/actions/objectsAction";
import {Select} from "antd";
import { AvForm, AvField , AvCheckbox, AvCheckboxGroup} from 'availity-reactstrap-validation';

const Client = (props) => {
    let  today = new Date(),
        date =    today.getFullYear()  + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const {Option} = Select;

    useEffect(() => {
        props.getAttendanceList()
        props.hoursLits()
        props.getObjects()
        props.reasonList()





    }, [])


    const saveAttandance = (event, values) => {
        props.addAttandance({...values});

        console.log(values)

    }



    return (
        <div className = "Client">
            <h5>Сегодня дата: {date}</h5>

            <h4 className='mt-3'>Выберите рабочих которые сегодня работали:</h4>

            <AvForm onInvalidSubmit={saveAttandance} >

            {
                props.attendanceWorkerList?.map((item, i) => (
                    <div className="attendenceCard" >


                        <AvCheckboxGroup name="worker"  >
                            <AvCheckbox value={item.id} />
                        </AvCheckboxGroup>

                        <h5>{item.first_name}  {item.last_name}  {item.middle_name} </h5>
 

                        <h6>Выберите объект:</h6>
                        <Select name={'construction' + [i] }  style={{width: '200px'}}  >
                            { props.objectsList.map(item2 => (
                                <Option value={item2.name}>{item2.name}  </Option>
                            ))}
                        </Select>
                        <h6>Выберите сколько часов работал:</h6>

                        <Select name={'working_hours' + [i] }  style={{width: '80px'}}  >
                            { props.workingHourList.map(item2 => (
                                <Option value={item2.hour}>{item2.hour} ч</Option>
                            ))}
                        </Select>

                        <h6>Причина</h6>

                        <Select name={'reason' + [i] }  style={{width: '150px'}}  >
                            { props.reasonAllList.map(item3 => (
                                <Option value={item3.reason}>{item3.reason} </Option>
                            ))}
                        </Select>

                </div>



                ))
            }

                <button   className='btn addObject mt-4 btn-primary' onClick={saveAttandance}>Сохранить</button>

            </AvForm>

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


export default connect(mapStateToProps, {getAttendanceList, getObjects, reasonList, hoursLits, addAttandance})(Client);
