import 'antd/dist/antd.css';
import React, { useState} from "react";
import {Modal, Space, Table, Typography} from 'antd';
import EditInventoryModal from "./inventoryAdditionModal";
import {Drink} from "../types/drink";
import {Vendors } from "../enums/vendors";
import InventoryAdditionModal from "./inventoryAdditionModal";
import InventoryRemovalModal from "./inventoryRemovalModal";

interface InventoryTableProps{
    data: Array<Drink>;
    side: string;
}


const InventoryTable:React.FC<InventoryTableProps> = ({data, side}) => {
const [showAddModal, setShowAddModal] = useState(false);
const [showRemoveModal, setShowRemoveModal] = useState(false);
const [editingRecord, setEditingRecord] = useState({
    vendor: '',
    name: '',
    quantity: 0,
} as Drink);

const add = (record: Drink) => {
    setEditingRecord(record);
    setShowAddModal(true);
};

    const remove = (record: Drink) => {
        setEditingRecord(record);
        setShowRemoveModal(true);
    };

    const deleteLiquor = (record: Drink) => {
        const name = record.name;
        const vendor = record.vendor;
        const title =  `Are you sure that you want to delete ${name} from  ${vendor} from the ${side}?`
        console.log(name);
        Modal.confirm({
            title: title,
            okType: "danger",
            onOk: async () => {
              //TODO: Delete from database on current side with success message
            },
        });
    }

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
                        <Typography.Link onClick={() => deleteLiquor(record)}>
                            View
                        </Typography.Link>
                        <Typography.Link onClick={() => deleteLiquor(record)}>
                            Delete
                        </Typography.Link>
                    </Space>
                    </>
                )
            },
        },
    ];

return (
    <>
        <InventoryAdditionModal showModal={showAddModal} setShowModal={setShowAddModal} record={editingRecord} />
        <InventoryRemovalModal showModal={showRemoveModal} setShowModal={setShowRemoveModal} record={editingRecord} />
        <Table columns={columns} dataSource={data} />
    </>
);
};


export default InventoryTable;