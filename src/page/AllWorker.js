import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import {FormOutlined, DeleteOutlined, SearchOutlined} from '@ant-design/icons';
import React, {Component} from "react";
import {getAllUsers} from "../redux/actions/AllWorkerAction";
import {connect} from "react-redux";
import Positions from "./Positions";


class AllWorker extends  Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };


    componentDidMount() {
         this.props.getAllUsers()
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Поиск...`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Поиск
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Сброс
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Фильтр
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [
            {
                title: 'Имя',
                dataIndex: 'first_name',
                ...this.getColumnSearchProps('first_name'),

            },
            {
                title: 'Фамилия',
                dataIndex: 'last_name',
                ...this.getColumnSearchProps('last_name'),


            },
            {
                title: 'Отчество',
                dataIndex: 'middle_name',
                ...this.getColumnSearchProps('middle_name'),


            },

            {
                title: 'Телефонный номер',
                dataIndex: 'phone',
                ...this.getColumnSearchProps('phone'),

            },
            {
                title: 'Oбъект',
                dataIndex: 'construction_name',
                ...this.getColumnSearchProps('construction_name'),

            },
            {
                title: 'Должность',
                dataIndex: 'position_name',
                ...this.getColumnSearchProps('position_name'),

            },


            {
                title: 'Действие',
                dataIndex: '',
                key: 'action',
                render: (action, record: { id: number }) => {
                    return (
                        <>

                            {/*<button type="primary" onClick={onEdit(record.id:number)}>edit</button>*/}


                            <Button className="border-0  pl-1 pr-1 text-secondary" ReactNode
                                    icon={<FormOutlined style={{fontSize: '24px'}}/>}/>

                            <Button className="border-0 ml-3  pl-1 pr-1 text-secondary" ReactNode
                                    icon={<DeleteOutlined style={{fontSize: '24px'}}/>}/>

                        </>
                    )
                }
            }
        ];
        return <div className="Objects">


            <div className="objectHeader">
                <h2>Список всех рабочих</h2>


            </div>


            <Table columns={columns} dataSource={this.props.allWorker}  size="small"/>

        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        allWorker: state.allWorker.allWorker

    }
}



export default connect(mapStateToProps,{getAllUsers,  })(AllWorker);