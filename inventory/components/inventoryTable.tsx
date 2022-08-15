import 'antd/dist/antd.css';
import React, {useEffect, useState} from "react";
import {Space, Table, Typography} from 'antd';
import {pubDrinks} from "../data/pubDrinks";
import {loungeDrinks} from "../data/loungeDrinks";
import EditInventoryModal from "./editInventoryModal";
import {Drink} from "../types/drink";
import {Brands } from "../enums/brands";
import {Sides} from "../enums/side";

interface InventoryTableProps{
    side: string;
}


const InventoryTable:React.FC<InventoryTableProps> = ({side}) => {
const [showEditModal, setShowEditModal] = useState(false);
const [data, setData] = useState(Array<Drink>());
const [editingRecord, setEditingRecord] = useState({
    brand: '',
    name: '',
    quantity: 0,
} as Drink);

const edit = (record: Drink) => {
    setEditingRecord(record);
    setShowEditModal(true);
};

    const deleteRecord = (record: Drink) => {

    };

    useEffect(() => {
        const showData = () => {
            if (side == Sides.pubSide){
                setData(pubDrinks)
            } else if (side == Sides.loungeSide){
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
                    text: Brands.generalBeverage,
                    value: Brands.generalBeverage,
                },
                {
                    text: Brands.triangleDistributing,
                    value: Brands.triangleDistributing,
                },
                {
                    text: Brands.breakThru,
                    value: Brands.breakThru,
                },
                {
                    text: Brands.badgerLiquor,
                    value: -Brands.badgerLiquor,
                },
            ],
            onFilter: (value, record) => record.brand.includes(value),
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