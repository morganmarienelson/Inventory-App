import 'antd/dist/antd.css';
import {useState} from "react";
import { Table, Typography } from 'antd';
import {drinks} from "../data/drinks";
import EditInventoryModal from "./editInventoryModal";
import {Drink} from "../types/drink";

const InventoryTable = () => {
const [showEditModal, setShowEditModal] = useState(false);
const [editingRecord, setEditingRecord] = useState({
    name: '',
    category: '',
    quantity: 0,
});

const edit = (record: Drink) => {
    setEditingRecord(record);
    setShowEditModal(true);
};

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            width: '30%',
            filters: [
                {
                    text: 'Vodka',
                    value: 'Vodka',
                },
                {
                    text: 'Beer',
                    value: 'Beer',
                },
                {
                    text: 'Wine',
                    value: 'Wine',
                },
            ],
            onFilter: (value, record) => record.category.includes(value),
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
            editable: true,
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
        <Table columns={columns} dataSource={drinks} />
    </>
);
};


export default InventoryTable;