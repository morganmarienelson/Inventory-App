import 'antd/dist/antd.css';
import React, { useState} from "react";
import { Space, Table, Typography, Popconfirm, message} from 'antd';
import {Drink} from "../types/drink";
import {Vendors } from "../enums/vendors";
import InventoryAdditionModal from "./inventoryAdditionModal";
import InventoryRemovalModal from "./inventoryRemovalModal";
import { Sides } from '../enums/side';
import {UserActionMessages} from "../enums/userActionMessages";

interface InventoryTableProps{
    data: Array<Drink>;
    side: string;
    setFetchTableData : (fetchTableData: boolean) => void;
}


const InventoryTable:React.FC<InventoryTableProps> = ({data,  side, setFetchTableData}) => {
const [showAddModal, setShowAddModal] = useState(false);
const [showRemoveModal, setShowRemoveModal] = useState(false);
const [editingRecord, setEditingRecord ] = useState({
    _id: '',
    vendor: '',
    name: '',
    quantity: 0,
})


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

    const recordEmployeeDeletionAction = async (editingRecord: Drink, id: string) => {
        //TODO: get employee name on delete
        let today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();
        const userDeletion = {
            employee: "employee",
            productId: id,
            vendor: editingRecord.vendor,
            liquorName: editingRecord.name,
            quantity: editingRecord.quantity,
            date: date,
            side: side,
        }
        try {
            const res = await fetch('http://localhost:3000/api/inventoryDeletions', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userDeletion)
            })
            if (res.ok){
                message.success(UserActionMessages.liquorDeletionSuccess, 2);
            } else {
                message.error(UserActionMessages.liquorDeletionError, 2);
            }

        } catch (error) {
            message.error(UserActionMessages.liquorDeletionError, 2);
        }
    }

    const deleteLiquor = async () => {
        const liquorId = editingRecord._id;
        if (side == Sides.pubSide){
            try {
                const deleted = await fetch(`http://localhost:3000/api/pubDrinks/${liquorId}`, {
                    method: "Delete"
                });
                if (deleted.ok){
                    setFetchTableData(true);
                    message.success('Deletion was successful');
                    await recordEmployeeDeletionAction(editingRecord, liquorId);
                } else{
                    message.error("Deletion failed")
                }
            } catch (error){
                console.log(error);
                message.error("Deletion failed")
            }
        } else if (side == Sides.loungeSide){
            try {
                const deleted = await fetch(`http://localhost:3000/api/loungeDrinks/${liquorId}`, {
                    method: "Delete"
                });
                if (deleted.ok){
                    setFetchTableData(true);
                    message.success('Deletion was successful');
                    await recordEmployeeDeletionAction(editingRecord, liquorId);
                } else{
                    message.error("Deletion failed")
                }
            } catch (error){
                console.log(error);
                message.error("Deletion failed")
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
        <InventoryAdditionModal showModal={showAddModal} side={side} setShowModal={setShowAddModal} record={editingRecord} setFetchTableData={setFetchTableData} />
        <InventoryRemovalModal showModal={showRemoveModal} setShowModal={setShowRemoveModal} record={editingRecord}  side={side}  setFetchTableData={setFetchTableData} />
        <Table columns={columns} dataSource={data} />
    </>
);
};


export default InventoryTable;