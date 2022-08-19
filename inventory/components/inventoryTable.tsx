import 'antd/dist/antd.css';
import React, { useState} from "react";
import { Space, Table, Typography, Popconfirm, message} from 'antd';
import {DrinkType} from "../types/drinkType";
import {Vendors } from "../enums/vendors";
import InventoryAdditionModal from "./tableModals/inventoryAdditionModal";
import InventoryRemovalModal from "./tableModals/inventoryRemovalModal";
import { Sides } from '../enums/side';
import {UserActionMessages} from "../enums/userActionMessages";
import {LiquorInventoryMessages} from "../enums/liquorInventoryMessages";

interface InventoryTableProps{
    data: Array<DrinkType>;
    side: string;
    setFetchTableData : (fetchTableData: boolean) => void;
    employee: string;
    liqNameFilters: any;
}


const InventoryTable:React.FC<InventoryTableProps> = ({data, liqNameFilters, side, setFetchTableData, employee}) => {
const [showAddModal, setShowAddModal] = useState(false);
const [showRemoveModal, setShowRemoveModal] = useState(false);
const [editingRecord, setEditingRecord ] = useState({
    _id: '',
    vendor: '',
    name: '',
    quantity: 0,
})


const add = (record: DrinkType) => {
    setEditingRecord(record);
    setShowAddModal(true);
};

    const remove = (record: DrinkType) => {
        setEditingRecord(record);
        setShowRemoveModal(true);
    };

    const prepareDelete = (record: DrinkType) => {
        setEditingRecord(record);
    };

    const recordEmployeeDeletionAction = async (editingRecord: DrinkType, id: string) => {
        let today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();
        const inventoryDeletion = {
            employee: employee,
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
                body: JSON.stringify(inventoryDeletion)
            })
            if (res.ok){
                message.success(UserActionMessages.liquorDeletionSuccess, 2);
            } else {
                message.error(UserActionMessages.liquorDeletionError, 2);
            }
        } catch (error) {
            console.log(error);
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
                    message.success(LiquorInventoryMessages.inventoryDeletionSuccess);
                    await recordEmployeeDeletionAction(editingRecord, liquorId);
                } else{
                    message.error(LiquorInventoryMessages.inventoryDeletionError);
                }
            } catch (error){
                console.log(error);
                message.error(LiquorInventoryMessages.inventoryDeletionError);
            }
        } else if (side == Sides.loungeSide){
            try {
                const deleted = await fetch(`http://localhost:3000/api/loungeDrinks/${liquorId}`, {
                    method: "Delete"
                });
                if (deleted.ok){
                    setFetchTableData(true);
                    message.success(LiquorInventoryMessages.inventoryDeletionSuccess);
                    await recordEmployeeDeletionAction(editingRecord, liquorId);
                } else{
                    message.error(LiquorInventoryMessages.inventoryDeletionError);
                }
            } catch (error){
                console.log(error);
                message.error(LiquorInventoryMessages.inventoryDeletionError);
            }
        } 
    }

    const onCancelDelete = () => {
        message.warn(LiquorInventoryMessages.inventoryDeletionWarning);
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
            title: 'Liquor Name',
            dataIndex: 'name',
            filters: liqNameFilters,
            onFilter: (value, record) => record.name.includes(value),
            filterSearch: true,
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
        <InventoryAdditionModal showModal={showAddModal} side={side} setShowModal={setShowAddModal} record={editingRecord} setFetchTableData={setFetchTableData} employee={employee} />
        <InventoryRemovalModal showModal={showRemoveModal} setShowModal={setShowRemoveModal} record={editingRecord}  side={side}  setFetchTableData={setFetchTableData} employee={employee} />
        <Table columns={columns} dataSource={data} />
    </>
);
};


export default InventoryTable;