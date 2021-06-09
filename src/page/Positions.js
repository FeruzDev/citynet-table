import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {addPositions, getPosition} from "../redux/actions/positionAction";
import {Button, Table} from "antd";
import {CloseOutlined, EditFilled, MinusCircleOutlined} from "@ant-design/icons";
import {Modal} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Positions = (props) => {


    const columns = [

        {
            title: 'Hазвание',
            dataIndex: 'name',


        },
        // {
        //     title: 'Дата создания',
        //     dataIndex: 'date_created',
        //
        //
        // },

    ];

    useEffect(()=>{
        props.getPosition()
    }, [])


    const changeModal = () => {
        props.updateState({modalOpen: !props.modalOpen})
    }


    const saveUsers = (event, values) => {
        props.addPositions({...values});
    }



    return (
        <div className="Objects">
            <div className="objectHeader">
                <h2>Список должность</h2>

                <div>

                    <button className="btn addObject"  ><img src="/img/icon/addIcon.png" alt=""/>Добавить новый должность</button>

                </div>
            </div>



            <Modal
                isOpen={props.modalOpen}>
                <Button onClick={changeModal} className='mdi_close border-0 p-0 mr-3 mt-1'>   <CloseOutlined  style={{ fontSize: '24px' , color: "#d9d9d9"  }} />
                </Button>

                <AvForm onValidSubmit={saveUsers} >

                    <AvField
                        name="username"
                        type="text"
                        label="Имя пользователя"
                        required
                    />


                    <AvField
                        name="password"
                        type="text"
                        label="Пароль"
                        required
                    />



                    <AvField
                        name="password2"
                        type="text"
                        label="Подтвержденный пароль"
                        required
                    />
                    <button className="btn btn-primary"  >Добавлять</button>
                </AvForm>
            </Modal>




            <Table  columns={columns} dataSource={props.positionList}  size="small" />
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        positionList: state.positionList.positionList

    }
}



export default connect(mapStateToProps,{getPosition, addPositions })(Positions);
