import 'antd/dist/antd.css';
import React, {useEffect, useState} from "react";
import { Table, Typography } from 'antd';
import {pubDrinks} from "../data/pubDrinks";
import {loungeDrinks} from "../data/loungeDrinks";
import EditInventoryModal from "./editInventoryModal";
import {Drink} from "../types/drink";

interface InventoryTableProps{
    side: string;
}


const InventoryTable:React.FC<InventoryTableProps> = ({side}) => {
const [showEditModal, setShowEditModal] = useState(false);
const [data, setData] = useState(Array<Drink>());
const [editingRecord, setEditingRecord] = useState({
    name: '',
    brand: '',
    quantity: 0,
});

const edit = (record: Drink) => {
    setEditingRecord(record);
    setShowEditModal(true);
};

    useEffect(() => {
        const showData = () => {
            if (side == "pub"){
                setData(pubDrinks)
            } else if (side == "lounge"){
                setData(loungeDrinks)
            }
        }
        showData();
    }, [side])

    const columns = [
        {
            title: 'Brand',
            dataIndex: 'brand',
            width: '30%',
            filters: [
                {
                    text: 'General Beverage',
                    value: 'General Beverage',
                },
                {
                    text: 'Triangle Distributing',
                    value: 'Triangle Distributing',
                },
                {
                    text: 'Break Thru',
                    value: 'Break Thru',
                },
                {
                    text: 'Badger Liquor',
                    value: 'Badger Liquor',
                },
            ],
            onFilter: (value, record) => record.brand.includes(value),
            filterSearch: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '45%',
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
                    <Typography.Link onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
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