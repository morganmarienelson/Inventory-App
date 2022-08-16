import 'antd/dist/antd.css';
import React, {useEffect, useState} from "react";
import {Space, Table, Typography} from 'antd';
import {pubDrinks} from "../data/pubDrinks";
import {loungeDrinks} from "../data/loungeDrinks";
import EditInventoryModal from "./editInventoryModal";
import {Drink} from "../types/drink";
import {Vendors } from "../enums/vendors";
import {Sides} from "../enums/side";

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

    const deleteRecord = (record: Drink) => {

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
            width: '30%',
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
                            Restock
                        </Typography.Link>
                        <Typography.Link onClick={() => edit(record)}>
                            Remove
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