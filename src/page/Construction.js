import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    getObjects,
    updateState,
    addObjects,
    editObject,
    deleteObject,
    getInActiveObjects, getConstruction, addConstruction, getInActiveConstruction,

} from "../redux/actions/objectsAction"
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import {Button, Switch, Table, Menu, Dropdown, message} from 'antd';
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import FormOutlined from "@ant-design/icons/es/icons/FormOutlined";
import UndoOutlined from "@ant-design/icons/es/icons/UndoOutlined";
import DownOutlined from "@ant-design/icons/es/icons/DownOutlined";


const Construction = (props) => {

    const columns = [
        {
            title: 'Название объекта',
            dataIndex: 'name',
        },

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

    const columnsForRemove = [
        {
            title: 'Название объекта',
            dataIndex: 'name',
        },

        {
            title: 'Действие',
            dataIndex: '',
            key: 'action',
            render: (action, record: {id: number}) => {
                return (
                    <>

                        {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}


                        <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode icon={<FormOutlined style={{ fontSize: '24px'  }}/>} onClick={(): void => onEdit(record.id)} />



                        <Button className="border-0 ml-3  pl-1 pr-1 text-success" ReactNode icon={<UndoOutlined style={{ fontSize: '24px'   }}/>}  onClick={(): void => onReturn(record.id)} />
                    </>
                )
            }
        },

    ];



    const [userValueObjectState, setuserValueObjectState] = useState({})

    const onEdit = (id) => {



        console.log('Edit record number', id)

        axios.get(API_PATH + "construction/v1/object-retrieve-update/" + id + "/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setuserValueObjectState(res.data);
                // props.updateState({modalOpenEditAgain: !props.modalOpenEditAgain})
                props.updateState({editOpenModalConstruction: !props.editOpenModalConstruction})

                console.log(res)
            })






    }

    const [removeObjects, setRemoveObjects] = useState(null)

    const onDelete = (id) => {

        console.log('Remove record number', id)


        props.updateState({deleteOpenModal: !props.deleteOpenModal})

        setRemoveObjects(id)


    }


    const onReturn = (id) => {

        console.log('Remove record number', id)


        props.updateState({returnOpenModal: !props.returnOpenModal})

        setRemoveObjects(id)


    }


    const onRemove = (id) => {

        console.log('Remove record number', id)

        axios.put(API_PATH + "construction/v1/object-inactivate/" + removeObjects + "/", '',{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                props.updateState({deleteOpenModal: !props.deleteOpenModal})
                props.getConstruction()
                props.getInActiveConstruction()

            })

    }


    const onReturnActive = (id) => {

        console.log('Remove record number', id)

        axios.put(API_PATH + "construction/v1/object-activate/" + removeObjects + "/", '',{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                props.updateState({returnOpenModal: !props.returnOpenModal})
                props.getInActiveConstruction()
                props.getConstruction()

            })



    }

    useEffect(()=> {
        props.getConstruction()
        props.getInActiveConstruction()
    }, [])


    const changeModal = () => {
        props.updateState({modalOpenConstruction: !props.modalOpenConstruction})
    }

    const changeDeleteModal = () => {
        props.updateState({deleteOpenModal: !props.deleteOpenModal})
    }

    const changeReturnModal = () => {
        props.updateState({returnOpenModal: !props.returnOpenModal})
    }

    const changeEditModal = () => {
        props.updateState({editOpenModalConstruction: !props.editOpenModalConstruction})
    }



    const saveObjects = (event, values) => {
        props.addConstruction({...values});
    }



    const editObjects = (event, values) => {


        event.preventDefault()
        let data2 = new FormData();
        data2.append("name", event.target.name.value)
        data2.append("description", event.target.description.value)
        axios.put(API_PATH + "construction/v1/object-retrieve-update/" + userValueObjectState.id + "/", data2 , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {

                props.getConstruction()

            })


        changeEditModal();
        // window.location.reload();



    }





    const deleteItem = (data) => {
        props.updateState({selectedIdForDelete: data.id});

    }





    return (

        <div className="Objects">


            <div className="objectHeader">
                <h2>Список объектов</h2>

                <div>
                    <button className="btn  addObject" onClick={changeModal}><img src="/img/icon/add.png" alt=""/>Добавить объект</button>




                    <button className={"btn activeObject ml-3"} onClick={() => props.updateState({objectsInActive: false})} ><span></span>Активный</button>

                    <button className="btn removeObject ml-3" onClick={() => props.updateState({objectsInActive: true})} > <span></span>Неактивный</button>

                </div>
            </div>


            {
                props.objectsInActive ?
                    <Table columns={columnsForRemove} dataSource={props.constructionInActiveList} size="small"  />
                    :
                    <Table columns={columns} dataSource={props.constructionList} size="small"  />

            }





            {/*FOR ADD*/}
            <Modal
                isOpen={props.modalOpenConstruction}
                className="objectModal"
                contentLabel="Example Modal"
            >
                {/*<button onClick={changeModal} className="btn  mdi_close"><img src="/img/icon/mdi_close.png" alt=""/></button>*/}

                <ModalBody>
                    <div className="addObjectModal">

                        <h4 className="mb-4">Добавить новый объект</h4>
                        <AvForm onValidSubmit={saveObjects}
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
                                required
                                style={{height: '165px'}}
                            />

                            <button className="btn formAddButton  "  >Добавить</button>
                            <button className="btn  formCancel   " onClick={changeModal}  >Отмена</button>
                        </AvForm>
                    </div>
                </ModalBody>
            </Modal>


            {/*FOR EDIT*/}

            <Modal
                isOpen={props.editOpenModalConstruction}
                className="objectModal"
                contentLabel="Example Modal"

            >
                <button onClick={changeEditModal} className="btn  mdi_close"><img src="/img/icon/mdi_close.png" alt=""/></button>

                <ModalBody>
                    <div className="addObjectModal">

                        <h3 className="mb-4">Добавить новый объект</h3>
                        <AvForm onValidSubmit={editObjects}
                                model={userValueObjectState}
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
                                required
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
                    <button type='button' className="btn btn-danger" onClick={  onRemove }>Да</button>
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

            {/*FOR EDIT*/}

        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        modalOpen: state.objectsList.modalOpen,
        modalOpenConstruction: state.objectsList.modalOpenConstruction,
        deleteOpenModal: state.objectsList.deleteOpenModal,
        returnOpenModal: state.objectsList.returnOpenModal,
        editOpenModalConstruction: state.objectsList.editOpenModalConstruction,
        objectsInActive: state.objectsList.objectsInActive,
        constructionInActiveList: state.objectsList.constructionInActiveList,
        selectedImage: state.objectsList.selectedImage,
        objList: state.usersList.objList,
        objectsList: state.objectsList.objectsList,
        constructionList: state.objectsList.constructionList,
        objectsInActiveList: state.objectsList.objectsInActiveList,
        selectedIdForDelete: state.objectsList.selectedIdForDelete,
        selectedIdForEdit: state.objectsList.selectedIdForEdit,
        deleteObject: state.objectsList.deleteObject,
        selectedObject: state.objectsList.selectedObject,
    }
}
export default connect(mapStateToProps,{getConstruction,  editObject,getInActiveConstruction, updateState,deleteObject, addConstruction})(Construction);