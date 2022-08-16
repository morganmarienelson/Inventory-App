import 'antd/dist/antd.css';
import React, { useState} from "react";
import { Select, Space, Table, Typography, Popconfirm, message} from 'antd';
import {Drink} from "../types/drink";
import {Vendors } from "../enums/vendors";
import InventoryAdditionModal from "./inventoryAdditionModal";
import InventoryRemovalModal from "./inventoryRemovalModal";
import {employeeData} from "../data/employeeData";

interface InventoryTableProps{
    data: Array<Drink>;
}


const InventoryTable:React.FC<InventoryTableProps> = ({data}) => {
const [showAddModal, setShowAddModal] = useState(false);
const [showRemoveModal, setShowRemoveModal] = useState(false);
const [editingRecord, setEditingRecord] = useState({
    vendor: '',
    name: '',
    quantity: 0,
} as Drink);
    const { Option } = Select;

const add = (record: Drink) => {
    setEditingRecord(record);
    setShowAddModal(true);
};

    const remove = (record: Drink) => {
        setEditingRecord(record);
        setShowRemoveModal(true);
    };

    const employeeNames = [];
    for (let i = 0; i < employeeData.length; i++) {
        employeeNames.push(<Option key={employeeData[i].id.toString(36)}>{employeeData[i].name.toString()}</Option>);
    }

    const deleteLiquor = (e: any) => {
        message.success('Deletion was successful');
    }

    const onCancelDelete = (e) => {
        message.warn('Deletion did not occur');
    };


    const columns = [
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            width: '30%',
            filters: [
                {
                    text: Vendors.generalBeverage,
                    value: Vendors.generalBeverage,
                },
                {
                    text: Vendors.triangleDistributing,
                    value: Vendors.triangleDistributing,
                },
                {
                    text: Vendors.breakThru,
                    value: Vendors.breakThru,
                },
                {
                    text: Vendors.badgerLiquor,
                    value: -Vendors.badgerLiquor,
                },
            ],
            onFilter: (value, record) => record.vendor.includes(value),
            filterSearch: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '15%',
            sort: 'descend',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <>
                    <Space size="middle">
                        <Typography.Link onClick={() => add(record)}>
                            Add
                        </Typography.Link>
                        <Typography.Link onClick={() => remove(record)}>
                            Remove
                        </Typography.Link>
                        <Typography.Link >
                            <Popconfirm
                                title="Are you sure to delete this liquor?"
                                onConfirm={deleteLiquor}
                                onCancel={onCancelDelete}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="#">Delete</a>
                            </Popconfirm>
                        </Typography.Link>
                    </Space>
                    </>
                )
            },
        },
    ];

return (
    <>
        <InventoryAdditionModal employeeNames={employeeNames} showModal={showAddModal} setShowModal={setShowAddModal} record={editingRecord} />
        <InventoryRemovalModal employeeNames={employeeNames} showModal={showRemoveModal} setShowModal={setShowRemoveModal} record={editingRecord} />
        <Table columns={columns} dataSource={data} />
    </>
);
};


export default InventoryTable;