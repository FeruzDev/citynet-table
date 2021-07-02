import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {AvForm, AvField, AvCheckbox} from 'availity-reactstrap-validation';
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import MinusCircleOutlined from "@ant-design/icons/es/icons/MinusCircleOutlined";

import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../tools/constants";
import {
    addUsers,
    getUsers,
    updateState,
    editUsers,
    getObjectsForItem,
    getUsersPosition,
    getUsersInActive, saveFile
} from "../redux/actions/usersAction";
import {Button, Select, Option, Table} from "antd";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
    import FormOutlined from "@ant-design/icons/es/icons/FormOutlined";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import UndoOutlined from "@ant-design/icons/es/icons/UndoOutlined";
import {getObjects} from "../redux/actions/objectsAction";
import {getPosition} from "../redux/actions/positionAction";

const Users = (props) => {


    const columns = [

        {
            title: 'Имя',
            dataIndex: 'first_name',


        },
        {
            title: 'Фамилия',
            dataIndex: 'last_name',


        },
        {
            title: 'Отчество',
            dataIndex: 'middle_name',


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
            dataIndex: 'construction_name'
        },
        {
            title: 'Должность',
            dataIndex: 'position_name',
        },


        {
            title: 'Действие',
            dataIndex: '',
            key: 'action',
            render: (action, record: {id: number}) => {
                return (
                    <>

                        {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}


                        <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode icon={<FormOutlined style={{ fontSize: '24px'  }}/>} onClick={() => onEdit(record.id)} />

                        <Button className="border-0 ml-3  pl-1 pr-1 text-secondary" ReactNode icon={<DeleteOutlined style={{ fontSize: '24px'   }}/>}  onClick={()  => onDelete(record.id)} />

                    </>
                )
             }
        },
    ];

    const columnsForRemove = [

        {
            title: 'Имя',
            dataIndex: 'first_name',


        },
        {
            title: 'Фамилия',
            dataIndex: 'last_name',


        },
        {
            title: 'Отчество',
            dataIndex: 'middle_name',


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
            dataIndex: 'construction_name'
        },
        {
            title: 'Должность',
            dataIndex: 'position_name',
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



    const onReturn = (id) => {


        props.updateState({returnOpenModal: !props.returnOpenModal})

        setRemoveObjects(id)


    }



    const onEdit = (id) => {
        console.log('Edit record number', id)
        props.updateState({modalOpenEditAgain: !props.modalOpenEditAgain})

        props.updateState({accountIdForEditAgain: id})
        setuserValueObjectState({})

        axios.get(API_PATH + "account/v1/worker-detail-update/" + id + "/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                setuserValueObjectState(res.data)
                props.updateState({modalOpenEditAgain: !props.modalOpenEditAgain})
                // props.updateState({modalOpenEdit: !props.modalOpenEdit})

                console.log(res)
            })




    }


    useEffect(()=> {
        props.getUsers()
        props.getUsersInActive()

        props.getObjectsForItem();

        props.getPosition()



    }, [])

    const onReturnActive = (id) => {

        console.log('Remove record number', id)

        axios.put(API_PATH + "account/v1/worker-activate/" + removeObjects + "/", '',{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                props.updateState({returnOpenModal: !props.returnOpenModal})

                props.getUsersInActive()

            })






    }


    const savePhoto = (e) => {
        console.log(e.target.files[0])
       props.saveFile(e.target.files[0]);
    }


    const [checked, setChecked] = useState(false)


    const [removeObjects, setRemoveObjects] = useState(null)


    const onDelete = (id) => {

        console.log('Remove record number', id)


        props.updateState({deleteOpenModal: !props.deleteOpenModal})

        setRemoveObjects(id)


    }


    const onRemove = (id) => {

        console.log('Remove record number', id)

        axios.put(API_PATH + "account/v1/worker-dismiss/" + removeObjects + "/", '',{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                props.updateState({deleteOpenModal: !props.deleteOpenModal})
                props.getUsers()

            })




    }


    //
    // const edi = (item) =>{
    //     alert(item.id)
    // }

    const changeToggleForChildren = () => {
        props.updateState({toggleChildrenList: !props.toggleChildrenList})
       console.log("toggle")
    }


    const changeModal = () => {
        props.updateState({modalOpen: !props.modalOpen})
    }


    const changeReturnModal = () => {
        props.updateState({returnOpenModal: !props.returnOpenModal})
    }

    const changeDeleteModal = () => {
        props.updateState({deleteOpenModal: !props.deleteOpenModal})
    }


    const changeModalEdit = () => {
        props.updateState({modalOpenEdit: !props.modalOpenEdit})
    }


    const changeModalEditAgain = () => {
        props.updateState({modalOpenEditAgain: !props.modalOpenEditAgain})
    }




    const saveUsers = (event, values) => {
        props.addUsers({...values});
    }








    const editUsers = (event, values , id) => {


        event.preventDefault()
        let data2 = new FormData();
        let imagefile = document.querySelector('#file');
        data2.append("first_name", event.target.first_name.value)
        data2.append("last_name", event.target.last_name.value)
        data2.append("middle_name", event.target.middle_name.value)

        data2.append("is_header", event.target.is_header.value)



        data2.append("header_worker", event.target.header_worker.value)


        data2.append("children.phone", event.target.phone.value)
        data2.append("construction", event.target.construction.value)
        data2.append("position", event.target.position.value)
        data2.append("phone", event.target.phone.value)
        data2.append("image", imagefile.files[0])



        axios.put(API_PATH + "account/v1/worker-detail-update/" + props.accountId + "/", data2,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)},     'Content-Type': 'multipart/form-data'})
            .then(res => {
                console.log(res)
                props.getUsers()

            })



        changeModalEdit()



    }


    const editHeaderUsers = (event, values , id) => {


        event.preventDefault()
        let data2 = new FormData();
        let imagefile = document.querySelector('#file');
        data2.append("first_name", event.target.first_name.value)
        data2.append("last_name", event.target.last_name.value)
        data2.append("middle_name", event.target.middle_name.value)

        data2.append("is_header", event.target.is_header.value)


        data2.append("children.phone", event.target.phone.value)
        data2.append("construction", event.target.construction.value)
        data2.append("position", event.target.position.value)
        data2.append("phone", event.target.phone.value)
        data2.append("image", imagefile.files[0])



        axios.put(API_PATH + "account/v1/worker-detail-update/" + props.accountId + "/", data2,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)},     'Content-Type': 'multipart/form-data'})
            .then(res => {
                console.log(res)
                props.getUsers()

            })



        changeModalEdit()



    }



    const editUsersAgain = (event, values , id) => {


        event.preventDefault()
        let data2 = new FormData();
        let imagefile = document.querySelector('#file');

        data2.append("first_name", event.target.first_name.value)
        data2.append("last_name", event.target.last_name.value)
        data2.append("middle_name", event.target.middle_name.value)
        data2.append("is_header", event.target.is_header.value)

        data2.append("header_worker", event.target.header_worker.value)
        data2.append("children.phone", event.target.phone.value)
        data2.append("construction", event.target.construction.value)
        data2.append("position", event.target.position.value)
        data2.append("phone", event.target.phone.value)
        data2.append("image", imagefile.files[0])



        axios.put(API_PATH + "account/v1/worker-detail-update/" + props.accountIdForEditAgain + "/", data2,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}, 'Content-Type': 'multipart/form-data'})
            .then(res => {
                console.log(res)
                props.getUsers()

            })



        changeModalEditAgain()

        props.getUsers()


    }

    const activeListWorkers = () =>{
        props.updateState({usersInActive: false})
        props.getUsers()
    }


        const inActiveListWorkers = () =>{
            props.updateState({usersInActive: true})
            props.getUsersInActive()
            }

    // const [header_worker,setHeader_worker] = useState('')

    const [selectedRowKeys, setselectedRowKeys] = useState([])

    console.log(selectedRowKeys)

   const  onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
       setselectedRowKeys(selectedRowKeys)
    };


    function handleSelectChange(event) {

        // if you want to support some really old IEs, add
        // event = event || window.event;

        var selectElement = event.target;

        var value = selectElement.value;
        // to support really old browsers, you may use
        // selectElement.value || selectElement.options[selectElement.selectedIndex].value;
        // like el Dude has suggested

        // do whatever you want with value
    }

    const rowSelection = {
        selectedRowKeys,
        onChange:  onSelectChange,
    };
        const  postForm = (e) =>{
        console.log(e.target.value)

        this.setState({[e.target.name]: e.target.value})
    }
    const { Option } = Select;





            return (

        <div className="Objects">

            <div className="objectHeader">
                <h2>Список Пользователи</h2>

                <div>

                    <button className="btn addObject" onClick={changeModal}><img src="/img/icon/add.png" alt=""/>Список бригад</button>
                    <button className="btn activeObject ml-3" onClick={activeListWorkers} ><span></span>Активный</button>

                    <button className="btn removeObject ml-3" onClick={ inActiveListWorkers} ><span></span>Неактивный</button>

                </div>
            </div>

            {
                props.usersInActive ?
                    <Table columns={columnsForRemove} dataSource={props.usersListInActive}  rowKey="id" size="middle"  />
                    :
                    <Table columns={columns} dataSource={props.usersList}   rowKey="id"  size="middle"   />

            }






            <Modal
            isOpen={props.modalOpen} className="createAccountModal">
                {/*<Button onClick={changeModal} className='mdi_close border-0 p-0 mr-3 mt-1'>   <CloseOutlined  style={{ fontSize: '24px' , color: "#d9d9d9"  }} />*/}
                {/*</Button>*/}

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
                        label="Подвердите пароль"
                        required
                    />
                    <button className="btn formAddButton"  >Добавить</button>
                    <button className="btn  formCancel   " onClick={changeModal}  >Отмена</button>

                </AvForm>
            </Modal>

            <Modal
            isOpen={props.modalOpenEdit}
            size='lg'
            model={userValueObjectState}
            >
                {/*<Button onClick={changeModalEdit}  className='mdi_close border-0 p-0 mr-3 mt-1'>   <CloseOutlined  style={{ fontSize: '24px' , color: "#b9b9b9"  }} />*/}
                {/*</Button>*/}
                <AvForm onValidSubmit={checked ? editHeaderUsers : editUsers} enctype="multipart/form-data" method="post" >

                    <div className="row">
                        <div className="col-md-6">
                            <AvField
                                name="first_name"
                                type="text"

                                label="Name"
                                required
                            />

                            <AvField
                                name="last_name"
                                type="text"

                                label="Last name"
                                required
                            />


                            <AvField
                                name="middle_name"
                                type="text"

                                label="Middle name"
                                required
                            />


                            <AvField  onClick={() => setChecked(!checked)} value={checked} type="checkbox" label="is_header"   name="is_header" />


                            {
                                checked ?
                                        ''
                                      :

                                    <AvField type='select' name="header_worker" label="Header worker"       style={{ width: "100%" }}  >
                                        {props.usersList.map(item =>(
                                            <option  value={item.id}>{item.first_name} {item.last_name} {item.middle_name}</option>
                                        ))}
                                    </AvField>

                             }


                            <label>Construction</label>
                            <AvField type='select' name="construction"  style={{ width: "100%" }}  >
                                {props.objList.map(item =>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </AvField>



                        </div>
                        <div className="col-md-6">



                            <AvField
                                name="phone"
                                type="text"
                                label="Phone "
                                required
                            />



                            <AvField type='select' name="position" label="Position"  style={{ width: "100%" }}  >
                                {props.positionList.map(item =>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </AvField>

                            <input type="file" id="file"
                                   onChange={savePhoto}
                                   className="form-control"/>

                        </div>
                    </div>


                    <button className="btn formAddButton"  >Добавить</button>
                    <button className="btn  formCancel   " onClick={changeModalEdit}  >Отмена</button>
                </AvForm>
            </Modal>



            <Modal
                isOpen={props.modalOpenEditAgain}
                size='lg'>
                {/*<Button onClick={changeModalEditAgain  } className='mdi_close border-0 p-0 mr-3 mt-1'>   <CloseOutlined  style={{ fontSize: '24px' , color: "#b9b9b9"  }} />*/}
                {/*</Button>*/}
                <AvForm onValidSubmit={editUsersAgain} model={userValueObjectState} >

                    <div className="row">
                        <div className="col-md-6">
                            <AvField
                                name="first_name"
                                type="text"
                                label="Name"
                                required
                            />

                            <AvField
                                name="last_name"
                                type="text"
                                label="Last name"
                                required
                            />


                            <AvField
                                name="middle_name"
                                type="text"
                                label="Middle name"
                                required
                            />


                            <AvField  onClick={() => setChecked(!checked)} type="checkbox" label="is_header"   name="is_header" />


                            {
                                checked ? {header_worker: ''} :

                                    <AvField type='select' name="header_worker" label="Header worker"       style={{ width: "100%" }}  >
                                        {props.usersList.map(item =>(
                                            <option  value={item.id}>{item.first_name} {item.last_name} {item.middle_name}</option>
                                        ))}
                                    </AvField>

                            }


                            <label>Construction</label>
                            <AvField type='select' name="construction"  style={{ width: "100%" }}  >
                                {props.objList.map(item =>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </AvField>



                        </div>
                        <div className="col-md-6">


                            <AvField
                                name="phone"
                                type="text"
                                label="Phone "
                                required
                            />



                            <AvField type='select' name="position" label="Position"  style={{ width: "100%" }}  >
                                {props.positionList.map(item =>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </AvField>


                            <AvField
                                name="image"
                                type="file"
                                label="Profile image "
                                required
                            />

                        </div>
                    </div>


                    <button className="btn formAddButton  "  >Добавить</button>

                    <button className="btn  formCancel   " onClick={changeModalEditAgain}  >Отмена</button>

                </AvForm>
            </Modal>





            {/*for delete*/}

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



        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        usersList: state.usersList.usersList,
        usersListInActive: state.usersList.usersListInActive,
        objList: state.usersList.objList,
        accountId: state.usersList.accountId,
        userConstruction: state.usersList.userConstruction,
        userPosition: state.usersList.userPosition,
        accountIdForEdit: state.usersList.accountIdForEdit,
        usersListAccount: state.usersList.usersListAccount,
        userValueObject: state.usersList.userValueObject,
        usersInActive: state.usersList.usersInActive,
        accountIdForEditAgain: state.usersList.accountIdForEditAgain,
        toggleChildrenList: state.usersList.toggleChildrenList,
        modalOpen: state.usersList.modalOpen,
        modalOpenEdit: state.usersList.modalOpenEdit,
        modalOpenEditAgain: state.usersList.modalOpenEditAgain,
        deleteOpenModal: state.usersList.deleteOpenModal,
        returnOpenModal: state.usersList.returnOpenModal,
        objectsList: state.objectsList.objectsList,
        userCheck: state.objectsList.userCheck,
        positionList: state.positionList.positionList,

    }
}
export default connect(mapStateToProps,{getUsers,getPosition, getObjectsForItem,saveFile, getUsersInActive,  getUsersPosition, updateState, addUsers, editUsers})(Users);