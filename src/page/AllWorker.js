import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {AvForm, AvField, AvCheckbox} from 'availity-reactstrap-validation';
import {Modal, ModalBody, ModalFooter} from "reactstrap";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import MinusCircleOutlined from "@ant-design/icons/es/icons/MinusCircleOutlined";
import { Skeleton } from 'antd';




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
import CaretDownOutlined from "@ant-design/icons/es/icons/CaretDownOutlined";
import CaretUpOutlined from "@ant-design/icons/es/icons/CaretUpOutlined";
import FormOutlined from "@ant-design/icons/es/icons/FormOutlined";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";
import UndoOutlined from "@ant-design/icons/es/icons/UndoOutlined";
import {getObjects} from "../redux/actions/objectsAction";
import {getPosition} from "../redux/actions/positionAction";
import {getAllUsers} from "../redux/actions/AllWorkerAction";

const AllWorker = (props) => {

    // <CaretDownOutlined />





    const sortLastName = () =>{

        props.updateState({forSort: !props.forSort});

        axios.get(API_PATH + "account/v1/all-active-workers-list/?q=" +( props.forSort ? "last_name" : "-last_name"), {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                props.updateState({allWorker: res.data});
            })

    }



    const sortFirstName = () =>{

        props.updateState({forSort: !props.forSort});

        axios.get(API_PATH + "account/v1/all-active-workers-list/?q=" +( props.forSort ? "first_name" : "-first_name"), {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                props.updateState({allWorker: res.data});
            })

    }



    const sortMiddleName = () =>{

        props.updateState({forSort: !props.forSort});

        axios.get(API_PATH + "account/v1/all-active-workers-list/?q=" + (props.forSort ? "middle_name" : "-middle_name"), {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                props.updateState({allWorker: res.data});
            })

    }




    const sortPositionName = () =>{

        props.updateState({forSort: !props.forSort});

        axios.get(API_PATH + "account/v1/all-active-workers-list/?q=" +( props.forSort ? "position" : "-position"), {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                props.updateState({allWorker: res.data});
            })

    }

    const columns = [

        {
            title:  <span className='d-flex'>?????????????? <button onClick={sortLastName} className="filter-button-style border-0 pl-2 m-0 bg-transparent d-flex align-items-center">{props.forSort ? <CaretDownOutlined />  : <CaretUpOutlined /> }</button>  </span>,
            dataIndex: 'last_name',


        },
        {
            title:  <span className='d-flex'>?????? <button onClick={sortFirstName} className="filter-button-style border-0 pl-2 m-0 bg-transparent d-flex align-items-center">{props.forSort ? <CaretDownOutlined />  : <CaretUpOutlined /> }</button>  </span>,

            dataIndex: 'first_name',


        },

        {
            title:  <span className="d-flex">???????????????? <button onClick={sortMiddleName} className="filter-button-style border-0 bg-transparent pl-2 m-0  d-flex align-items-center">{props.forSort ? <CaretDownOutlined />  : <CaretUpOutlined /> }</button>  </span>,

            dataIndex: 'middle_name',


        },

        {
            title: '???????????????????? ??????????',
            dataIndex: 'phone',

        },
        // {
        //     title: 'O??????????',
        //     dataIndex: 'construction_name',
        //     sorter: () => true   ,
        // },
        {
            title:  <span className="d-flex"><span>??????????????????</span> <button onClick={sortPositionName} className="filter-button-style border-0 pl-2 m-0 bg-transparent d-flex align-items-center">{props.forSort ? <CaretDownOutlined />  : <CaretUpOutlined /> }</button>  </span>,


            dataIndex: 'position_name',


        },


        {
            title: '????????????????',
            dataIndex: '',
            key: 'action',
            render: (action, record: {id: number}) => {
                return (
                    <>

                        {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}


                        <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode icon={<FormOutlined style={{ fontSize: '24px'  }}/>} onClick={()=> onEdit(record)} />

                        <Button className="border-0 ml-3  pl-1 pr-1 text-secondary" ReactNode icon={<DeleteOutlined style={{ fontSize: '24px'   }}/>}  onClick={()  => onDelete(record.id)} />

                    </>
                )
            }
        },
    ];






    const [imgRemoveItem , setimgRemove] = useState(false)
    const imgRemove = () => {
        document.getElementById("profileImg").style.display = "none"
        setimgRemove(!imgRemoveItem)

    }

    const columnsForRemove = [

        {
            title: '??????',
            dataIndex: 'first_name',


        },
        {
            title: '??????????????',
            dataIndex: 'last_name',


        },
        {
            title: '????????????????',
            dataIndex: 'middle_name',


        },

        {
            title: '???????????????????? ??????????',
            dataIndex: 'phone',
            // sorter: {
            //     compare: (a, b) => a.phone - b.phone,
            //     multiple: 3,
            // },
        },

        {
            title: '??????????????????',
            dataIndex: 'position_name',
        },
        {
            title: '????????????????',
            dataIndex: '',
            key: 'action',
            render: (action, record: {id: number}) => {
                return (
                    <>

                        {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}


                        <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode icon={<FormOutlined style={{ fontSize: '24px'  }}/>} onClick={()  => onEdit(record)} />



                        <Button className="border-0 ml-3  pl-1 pr-1 text-success" ReactNode icon={<UndoOutlined style={{ fontSize: '24px'   }}/>}  onClick={()  => onReturn(record.id)} />
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


    const [foredit, setforedit] = useState({})

    const onEdit = (record) => {

        props.updateState({accountIdForEditAgain: record.id})
        setChecked(record.is_header)



        axios.get(API_PATH + "account/v1/worker-detail-update/" + record.id + "/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {
                props.updateState({forModel: record})
                // props.updateState({modalOpenEditAgain: !props.modalOpenEditAgain})

            })
        changeModalEditAgain()


    }


    useEffect(()=> {
        props.getUsers()
        props.getAllUsers()
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


        axios.put(API_PATH + "account/v1/worker-dismiss/" + removeObjects + "/", '',{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {


                props.updateState({deleteOpenModal: !props.deleteOpenModal})
                props.getAllUsers()

            })




    }


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

        props.updateState({forModel: {}})
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
        // data2.append("construction", event.target.construction.value)
        data2.append("position", event.target.position.value)
        data2.append("phone", event.target.phone.value)
        data2.append("image", imagefile.files[0])



        axios.put(API_PATH + "account/v1/worker-detail-update/" + props.accountId + "/", data2,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)},     'Content-Type': 'multipart/form-data'})
            .then(res => {
                console.log(res)
                props.getUsers()
                props.getAllUsers()

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
        // data2.append("construction", event.target.construction.value)
        data2.append("position", event.target.position.value)
        data2.append("phone", event.target.phone.value)
        data2.append("image", imagefile.files[0])



        axios.put(API_PATH + "account/v1/worker-detail-update/" + props.accountId + "/", data2,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)},     'Content-Type': 'multipart/form-data'})
            .then(res => {
                console.log(res)
                props.getUsers()

                props.getAllUsers()
                setChecked(!checked)
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


        checked ? console.log("is header")  :     (    data2.append("header_worker", event.target.header_worker.value))

        data2.append("children.phone", event.target.phone.value)
        // data2.append("construction", event.target.construction.value)
        data2.append("position", event.target.position.value)
        data2.append("phone", event.target.phone.value)


        imgRemoveItem ?     data2.append("image", imagefile.files[0]) : console.log("don't select img")



        axios.put(API_PATH + "account/v1/worker-detail-update/" + props.accountIdForEditAgain + "/", data2,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}, 'Content-Type': 'multipart/form-data'})
            .then(res => {
                console.log(res)
                props.getAllUsers()


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



        var selectElement = event.target;

        var value = selectElement.value;

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




    const   handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    const  clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    const clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };




    return (


        <div className="Objects">

            <div className="objectHeader">
                <h2>???????????? ????????????</h2>

                <div>

                    <button className="btn addObject" onClick={changeModal}><img src="/img/icon/add.png" alt=""/>???????????????? ????????????????????</button>
                    <button className="btn activeObject ml-3" onClick={activeListWorkers} ><span></span>????????????????</button>

                    <button className="btn removeObject ml-3" onClick={ inActiveListWorkers} ><span></span>????????????????????</button>

                </div>
            </div>

            {
                props.usersInActive ?
                    <Table columns={columnsForRemove} dataSource={props.usersListInActive}  rowKey="id" size="middle"  />
                    :


                    <Table columns={columns} dataSource={props.allWorker}      size="middle"   />


            }






            <Modal
                isOpen={props.modalOpen} className="createAccountModal">
                {/*<Button onClick={changeModal} className='mdi_close border-0 p-0 mr-3 mt-1'>   <CloseOutlined  style={{ fontSize: '24px' , color: "#d9d9d9"  }} />*/}
                {/*</Button>*/}

                <AvForm onValidSubmit={saveUsers} >

                    <AvField
                        name="username"
                        type="text"
                        label="?????? ????????????????????????"
                        required
                    />


                    <AvField
                        name="password"
                        type="text"
                        label="????????????"
                        required
                    />



                    <AvField
                        name="password2"
                        type="text"
                        label="???????????????????? ????????????"
                        required
                    />
                    <button className="btn formAddButton"  >????????????????</button>
                    <button className="btn  formCancel   " onClick={changeModal}  >????????????</button>

                </AvForm>
            </Modal>

            <Modal
                isOpen={props.modalOpenEdit}
                size='lg'

            >
                {/*<Button onClick={changeModalEdit}  className='mdi_close border-0 p-0 mr-3 mt-1'>   <CloseOutlined  style={{ fontSize: '24px' , color: "#b9b9b9"  }} />*/}
                {/*</Button>*/}
                <AvForm onValidSubmit={checked ? editHeaderUsers : editUsers} enctype="multipart/form-data" method="post" >

                    <div className="row">
                        <div className="col-md-6">
                            <AvField
                                name="first_name"
                                type="text"

                                label="??????"
                                required
                            />

                            <AvField
                                name="last_name"
                                type="text"

                                label="??????????????"
                                required
                            />


                            <AvField
                                name="middle_name"
                                type="text"

                                label="O??????????????"
                                required
                            />


                            <AvField  onClick={() => setChecked(!checked)}  value={checked} type="checkbox" label="????????????????"   name="is_header" />


                            {
                                checked ?
                                    ''
                                    :

                                    <AvField type='select' name="header_worker" label="????????????a"       style={{ width: "100%" }}  >
                                        {props.usersList.map(item =>(
                                            <option  value={item.id}>{item.first_name} {item.last_name} {item.middle_name}</option>
                                        ))}
                                    </AvField>

                            }


                            {/*<label>????????????a</label>*/}
                            {/*<AvField type='select' name="construction"  style={{ width: "100%" }}  >*/}
                            {/*    {props.objList.map(item =>(*/}
                            {/*        <option value={item.id}>{item.name}</option>*/}
                            {/*    ))}*/}
                            {/*</AvField>*/}



                        </div>
                        <div className="col-md-6">



                            <AvField
                                name="phone"
                                type="text"
                                label="?????????????? "
                                required
                                value='+998'

                            />



                            <AvField type='select' name="position" label="??????????????????"  style={{ width: "100%" }}  >
                                {props.positionList.map(item =>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </AvField>

                            <AvField type="file"
                                   id="file"
                                   required
                                     name


                                   // className="form-control"
                            />


                        </div>
                    </div>


                    <button className="btn formAddButton"  >????????????????</button>
                    <button className="btn  formCancel   " onClick={changeModalEdit}  >????????????</button>
                </AvForm>
            </Modal>



            <Modal
                isOpen={props.modalOpenEditAgain}
                size='lg' toggle={() =>changeModalEditAgain}>

                <AvForm onValidSubmit={editUsersAgain} model={props.forModel} >

                    <div className="row">
                        <div className="col-md-6">
                            <AvField
                                name="first_name"
                                type="text"
                                label="??????"
                                value={props.forModel.first_name}
                                required
                            />

                            <AvField
                                name="last_name"
                                type="text"
                                label="??????????????"
                                value={props.forModel.last_name}

                                required
                            />


                            <AvField
                                name="middle_name"
                                type="text"
                                label="O??????????????"
                                value={props.forModel.middle_name}

                                required
                            />



                            <AvField   checked={props.forModel.is_header  ? true : false} onChange={() => setChecked(!checked)} type="checkbox" label="????????????????"   name="is_header" />


                            {
                                checked ? '' :

                                    <AvField type='select' name="header_worker"
                                             value={props.forModel.header_worker}
                                             label="????????????a"
                                             style={{ width: "100%" }}  >
                                        {props.usersList.map(item =>(
                                            <option  value={item.id}>{item.first_name} {item.last_name} {item.middle_name}</option>
                                        ))}
                                    </AvField>

                            }




                            {/*<AvField   value={checked} type="checkbox" label="????????????????"   name="is_header" />*/}


                            {/*{*/}
                            {/*    checked ? {header_worker: ''} :*/}

                            {/*        <AvField type='select' name="header_worker"*/}
                            {/*                 value={props.forModel.header_worker}*/}
                            {/*                 label="????????????a"*/}
                            {/*                 style={{ width: "100%" }}  >*/}
                            {/*            {props.usersList.map(item =>(*/}
                            {/*                <option  value={item.id}>{item.first_name} {item.last_name} {item.middle_name}</option>*/}
                            {/*            ))}*/}
                            {/*        </AvField>*/}

                            {/*}*/}





                        </div>
                        <div className="col-md-6">


                            <AvField
                                name="phone"
                                type="text"
                                label="?????????????? "
                                value={props.forModel.phone}

                                required
                            />



                            <AvField type='select' name="position" label="??????????????????"
                                     value={props.forModel.position}
                                     style={{ width: "100%" }}  >
                                {props.positionList.map(item =>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </AvField>


                            <AvField
                                name="image"
                                type="file"
                                id="file"

                                onChange={imgRemove}
                                // required
                            />

                            <img src={props.forModel.image}  id='profileImg' className="profile-img"/>


                        </div>
                    </div>


                    <button className="btn formAddButton  "  >??????????????????</button>

                    <button className="btn  formCancel   " onClick={changeModalEditAgain}  >????????????</button>

                </AvForm>
            </Modal>





            {/*for delete*/}

            <Modal
                isOpen={props.deleteOpenModal} toggle={() =>changeDeleteModal}>
                <ModalBody>
                    <h5>???? ?????????????????????????? ???????????? ?????????????? ???????</h5>
                </ModalBody>
                <ModalFooter>
                    <button type='button' className="btn btn-danger" onClick={  onRemove }>????</button>
                    <button type='button' className="btn btn-secondary" onClick={() => {props.updateState({selectedIdForDelete: null}); changeDeleteModal()}}>??????</button>
                </ModalFooter>
            </Modal>

            <Modal
                isOpen={props.returnOpenModal} toggle={() =>changeReturnModal}>
                <ModalBody>
                    <h5>???? ?????????????????????????? ???????????? ??????????????</h5>
                </ModalBody>
                <ModalFooter>
                    <button type='button' className="btn btn-success" onClick={  onReturnActive }>????</button>
                    <button type='button' className="btn btn-secondary" onClick={() => {props.updateState({selectedIdForDelete: null}); changeDeleteModal()}}>??????</button>
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
        allWorker: state.allWorker.allWorker,
        forModel: state.allWorker.forModel,
        forSort: state.allWorker.forSort,
    }
}
export default connect(mapStateToProps,{getUsers,getPosition,getAllUsers, getObjectsForItem,saveFile, getUsersInActive,  getUsersPosition, updateState, addUsers, editUsers})(AllWorker);