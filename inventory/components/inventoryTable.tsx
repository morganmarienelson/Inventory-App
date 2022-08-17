import 'antd/dist/antd.css';
import React, { useEffect, useState} from "react";
import { Select, Space, Table, Typography, Popconfirm, message} from 'antd';
import {Drink} from "../types/drink";
import {Vendors } from "../enums/vendors";
import InventoryAdditionModal from "./inventoryAdditionModal";
import InventoryRemovalModal from "./inventoryRemovalModal";
import {employeeData} from "../data/employeeData";
import { Sides } from '../enums/side';

interface InventoryTableProps{
    data: Array<Drink>;
    editingRecord: Drink;
    setEditingRecord : (editingRecord: Drink) => void;
    side: string;
}


const InventoryTable:React.FC<InventoryTableProps> = ({data, setEditingRecord, editingRecord, side}) => {
const [showAddModal, setShowAddModal] = useState(false);
const [showRemoveModal, setShowRemoveModal] = useState(false);


const add = (record: Drink) => {
    setEditingRecord(record);
    setShowAddModal(true);
};

    const remove = (record: Drink) => {
        setEditingRecord(record);
        setShowRemoveModal(true);
    };

    const prepareDelete = (record: Drink) => {
        setEditingRecord(record);
    };

    const deleteLiquor = async () => {
        //TODO: get employee name on delete
        const liquorId = editingRecord._id; 
        var today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();
        const userDeletion = {
            employee: "test",
            quantity: editingRecord.quantity,
            vendor: editingRecord.vendor,
            name: editingRecord.name,
            date: date,
            side: side
        }
        console.log(userDeletion)
        if (side == Sides.pubSide){
            try {
                const deleted = await fetch(`http://localhost:3000/api/pubDrinks/${liquorId}`, {
                    method: "Delete"
                });
                message.success('Deletion was successful');
            } catch (error){
                console.log(error);
                message.error("Deletion failed")
            } 
            try {
                const res = await fetch('http://localhost:3000/api/userDeletions', {
                    method: 'POST',
                    headers: {
                         "Accept": "application/json",
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userDeletion)
                })
                message.success("Employee action has been recorded", 2);
            } catch (error) {
                message.error("Employee action did not record")
            }

        } else if (side == Sides.loungeSide){
            try {
                const deleted = await fetch(`http://localhost:3000/api/loungeDrinks/${liquorId}`, {
                    method: "Delete"
                });
                message.success('Deletion was successful');
            } catch (error){
                console.log(error);
                message.error("Deletion failed")
            } 
            try {
                const res = await fetch('http://localhost:3000/api/userDeletions', {
                    method: 'POST',
                    headers: {
                         "Accept": "application/json",
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userDeletion)
                })
                message.success("Employee action has been recorded", 2);
            } catch (error) {
                message.error("Employee action did not record")
            }

        } 
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
                        <Typography.Link  onClick={() => prepareDelete(record)}> 
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
        <InventoryAdditionModal showModal={showAddModal} side={side} setShowModal={setShowAddModal} record={editingRecord} />
        <InventoryRemovalModal showModal={showRemoveModal} setShowModal={setShowRemoveModal} record={editingRecord}  side={side}  />
        <Table columns={columns} dataSource={data} />
    </>
);
};


export default InventoryTable;