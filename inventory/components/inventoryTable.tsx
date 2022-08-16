import 'antd/dist/antd.css';
import React, { useState} from "react";
import {Space, Table, Typography} from 'antd';
import EditInventoryModal from "./editInventoryModal";
import {Drink} from "../types/drink";
import {Vendors } from "../enums/vendors";

interface InventoryTableProps{
    data: Array<Drink>;
}


const InventoryTable:React.FC<InventoryTableProps> = ({data}) => {
const [showEditModal, setShowEditModal] = useState(false);
const [editingRecord, setEditingRecord] = useState({
    vendor: '',
    name: '',
    quantity: 0,
} as Drink);

const edit = (record: Drink) => {
    setEditingRecord(record);
    setShowEditModal(true);
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
                        <Typography.Link onClick={() => edit(record)}>
                            Add
                        </Typography.Link>
                        <Typography.Link onClick={() => edit(record)}>
                            Remove
                        </Typography.Link>
                        <Typography.Link onClick={() => edit(record)}>
                            Delete Liquor
                        </Typography.Link>
                    </Space>
                    </>
                )
            },
        },
    ];

return (
    <>
        <EditInventoryModal showUpdateModal={showEditModal} setShowUpdateModal={setShowEditModal} record={editingRecord} />
        <Table columns={columns} dataSource={data} />
    </>
);
};


export default InventoryTable;