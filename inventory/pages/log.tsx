import React, {useState} from "react";
import {DatePicker, message, Select, Space, Table, Typography} from "antd";
import {Vendors} from "../enums/vendors";
import {Actions} from "../enums/userActions";
import {InventoryLogData} from "../data/inventoryLogData";
import styles from "../components/css/sideSelector.module.css";
import moment from "moment";

const Log = () => {
    const [showInventoryTable, setShowInventoryTable ] = useState(false);
    const [monthYear, setMonthYear ] = useState('');
    const [showInventoryAdditionInfo, setShowInventoryAdditionInfo ] = useState(false);
    const [showInventoryRemovalInfo, setShowInventoryRemovalInfo ] = useState(false);
    const [showLiquorDeletion, setShowLiquorDeletion ] = useState(false);
    const [showLiquorAddition, setShowLiquorAddition ] = useState(false);
    const [viewRecord, setViewRecord] = useState({
        employeeName: "",
        employeeAction:  "",
        vendor:  "",
        liquorName: "",
        day:  0,
        date:  ""
    })

    const onSelectedMonth = (date : moment.Moment) => {
        setShowInventoryTable(true);
        setMonthYear(date.format("MM/YYYY"));
        //TODO: pull data from this month and year to display on calendar
        //put into useEffect where pulls on change of month
    };

    const view = (record: any) => {
        if (record.employeeAction == Actions.InventoryAddition) {
            setShowInventoryAdditionInfo(true);
            setViewRecord(record);

        } else if (record.employeeAction == Actions.InventoryRemoval){
            setShowInventoryRemovalInfo(true);
            setViewRecord(record);
        }  else if (record.employeeAction == Actions.LiquorAddition){
            setShowLiquorAddition(true);
            setViewRecord(record);
        } else if (record.employeeAction == Actions.Deletion){
            setShowLiquorDeletion(true);
            setViewRecord(record);
        }

    }

    const columns = [
        {
            title: 'Day',
            dataIndex: 'day',
            width: '15%',
            sort: 'descend',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
        },
        {
            title: 'Employee Action',
            dataIndex: 'employeeAction',
            filters: [
                {
                    text: Actions.Deletion,
                    value: Actions.Deletion,
                },
                {
                    text: Actions.LiquorAddition,
                    value: Actions.LiquorAddition,
                },
                {
                    text:Actions.InventoryRemoval,
                    value: Actions.InventoryRemoval,
                },
                {
                    text: Actions.InventoryAddition,
                    value: Actions.InventoryAddition,
                },
            ],
            onFilter: (value, record) => record.vendor.includes(value),
            filterSearch: true,
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
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
            dataIndex: 'liquorName',
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <>
                        <Space size="middle">
                            <Typography.Link onClick={() => view(record)}>
                                View
                            </Typography.Link>
                        </Space>
                    </>
                )
            },
        },
    ];

    return (
        <>
            <div className={styles.container}>
                <div className={styles.label}>Month: </div>
                <DatePicker onChange={onSelectedMonth} picker="month" />
            </div>
            {showInventoryTable ? (
                <div>
                    <Table columns={columns} dataSource={InventoryLogData} />
                </div>
            ) : (
                <></>
            )}


            </>
    );

}

export default Log;