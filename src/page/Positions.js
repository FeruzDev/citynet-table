import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {addPositions, updateState, getPosition} from "../redux/actions/positionAction";
import {Button, Table} from "antd";
import {CloseOutlined, EditFilled, MinusCircleOutlined} from "@ant-design/icons";
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {ToastContainer} from "react-toastify";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import FormOutlined from "@ant-design/icons/es/icons/FormOutlined";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
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

        {
            title: 'Действие',
            dataIndex: '',
            key: 'action',
            render: (action, record: {id: number}) => {
                return (
                    <>

                        {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}


                        <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode icon={<FormOutlined style={{ fontSize: '24px'  }}/>} onClick={(): void => onEdit(record.id)} />



                        <Button className="border-0 ml-3  pl-1 pr-1 text-secondary" ReactNode icon={<DeleteOutlined style={{ fontSize: '24px'   }}/>}  onClick={(): void => onDelete(record.id)} />
                    </>
                )
            }
        },
    ];

    useEffect(()=>{
        props.getPosition()
    }, [])


    const [userValuePositionState, setuserValuePositionState] = useState({})

    const onEdit = (id) => {



        console.log('Edit record number', id)

        axios.get(API_PATH + "position/v1/position-retrieve-update/" + id + "/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setuserValuePositionState(res.data);
                // props.updateState({modalOpenEditAgain: !props.modalOpenEditAgain})
                props.updateState({editOpenModal: !props.editOpenModal})

                console.log(res)
            })






    }

    const [removePosition, setRemovePosition] = useState(null)

    const onDelete = (id) => {

        console.log('Remove record number', id)


        props.updateState({deleteOpenModal: !props.deleteOpenModal})

        setRemovePosition(id)


    }

    const editPosition = (event, values) => {


        event.preventDefault()
        let data2 = new FormData();
        data2.append("name", event.target.name.value)
        data2.append("description", event.target.description.value)
        axios.put(API_PATH + "position/v1/position-retrieve-update/" + userValuePositionState.id + "/", data2 , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                console.log(res)
                props.getPosition()

            })


        changeEditModal();
        // window.location.reload();



    }



    const onRemove = (id) => {

        console.log('Remove record number', id)

        axios.put(API_PATH + "position/v1/position-delete/" + removePosition + "/", '',{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                props.updateState({deleteOpenModal: !props.deleteOpenModal})
                props.getPosition()

            })

    }
    const onReturnActive = (id) => {

        console.log('Remove record number', id)

        axios.put(API_PATH + "construction/v1/construction-activate/" + removePosition + "/", '',{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                props.updateState({returnOpenModal: !props.returnOpenModal})
                props.getInActiveObjects()

            })






    }



    const changeModal = () => {
        props.updateState({modalOpenPosition: !props.modalOpenPosition})

    }



    const changeDeleteModal = () => {
        props.updateState({deleteOpenModal: !props.deleteOpenModal})
    }

    const changeReturnModal = () => {
        props.updateState({returnOpenModal: !props.returnOpenModal})
    }

    const changeEditModal = () => {
        props.updateState({editOpenModal: !props.editOpenModal})
    }



    const savePosition = (event, values) => {
        props.addPositions(values);
    }



    return (
        <div className="Objects">
            <div className="objectHeader">
                <h2>Список должность</h2>

                <div>

                    <button className="btn addObject" onClick={changeModal}  ><img src="/img/icon/addIcon.png" alt=""/>Добавить новый должность</button>

                </div>
            </div>



            <Modal
                isOpen={props.modalOpenPosition}>

                <AvForm onValidSubmit={savePosition} >

                    <AvField
                        name="name"
                        type="text"
                        label="должность"
                        required
                    />

                    <AvField
                        name="description"
                        type="textarea"
                        label="Oписание"

                        style={{height: '165px'}}
                    />


                    <button className="btn formAddButton"  >Добавлять</button>
                    <button className="btn  formCancel   " onClick={changeModal}  >Отмена</button>
                </AvForm>
            </Modal>



            <Modal
                isOpen={props.editOpenModal}
                className="objectModal"
                contentLabel="Example Modal"

            >
                <button onClick={changeEditModal} className="btn  mdi_close"><img src="/img/icon/mdi_close.png" alt=""/></button>

                <ModalBody>
                    <div className="addObjectModal">

                        <h3 className="mb-4">Добавить новый объект</h3>
                        <AvForm onValidSubmit={editPosition}
                                model={userValuePositionState}
                        >

                            <AvField
                                name="name"
                                type="text"
                                label="Введите название"
                                required
                            />

                            <AvField
                                name="description"
                                type="textarea"
                                label="Oписание"

                            />

                            <button className="btn formAddButton mt-3"  >Сохранить</button>
                        </AvForm>
                    </div>
                </ModalBody>
            </Modal>

            {/*FOR DELETE*/}

            <Modal
                isOpen={props.deleteOpenModal} toggle={() =>changeDeleteModal}>
                <ModalBody>
                    <h5>Вы действительно хотите удалить это?</h5>
                </ModalBody>
                <ModalFooter>
                    <button type='button' className="btn btn-danger" onClick={onRemove }>Да</button>
                    <button type='button' className="btn btn-secondary" onClick={() => {props.updateState({selectedIdForDelete: null}); changeDeleteModal()}}>Нет</button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={props.returnOpenModal} toggle={() =>changeReturnModal}>
                <ModalBody>
                    <h5>Вы действительно хотите вернуть</h5>
                </ModalBody>
                <ModalFooter>
                    <button type='button' className="btn btn-success" onClick={  onReturnActive }>Да</button>
                    <button type='button' className="btn btn-secondary" onClick={() => {props.updateState({selectedIdForDelete: null}); changeDeleteModal()}}>Нет</button>
                </ModalFooter>
            </Modal>




            <ToastContainer/>

            <Table  columns={columns} dataSource={props.positionList}  size="small" />
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        positionList: state.positionList.positionList,
        modalOpenPosition: state.positionList.modalOpenPosition,
        deleteOpenModal: state.positionList.deleteOpenModal,
        editOpenModal: state.positionList.editOpenModal,


    }
}



export default connect(mapStateToProps,{getPosition,updateState, addPositions })(Positions);
