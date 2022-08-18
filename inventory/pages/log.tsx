import React, {useEffect, useState} from "react";
import { Space, Table, Typography} from "antd";
import {Vendors} from "../enums/vendors";
import {Actions} from "../enums/userActions";
import {InventoryLogData} from "../data/inventoryLogData";
import styles from "../styles/Home.module.css"
import moment from "moment";
import { EmployeeNames} from "../data/employeeNames";
import {PubDrinkNames} from "../data/pubDrinksNames";
import SideSelector from "../components/sideSelecter";
import MonthSelecter from "../components/monthSelecter";
import InventoryAdditionModalLog from "../components/inventoryAdditionModaLogl";
import {EmployeeInventoryAdditionLog} from "../data/employeeInventoryAdditionLog";
import {InventoryAdditionLogType} from "../types/inventoryAdditionLogType";
import {EmployeeInventoryRemovalLog} from "../data/employeeInventoryRemovalLog";
import {InventoryRemovalLogType} from "../types/inventoryRemovalLogType";
import InventoryRemovalModalLog from "../components/inventoryRemovalModalLog";
import {LiquorAdditionLogType} from "../types/liquorAdditionLogType";
import {LiquorDeletionLogType} from "../types/liquorDeletionLogType";
import {EmployeeLiquorAdditionLog} from "../data/employeeLiquorAdditionLog";
import {EmployeeLiquorDeletionLog} from "../data/employeeLiquorDeletionLog";
import LiquorDeletionModalLog from "../components/liquorDeletionModalLog";
import LiquorAdditionModalLog from "../components/liquorAdditonModalLog";
import {PubSideUserLog} from "../data/pubSideUserLog";
import {LoungeSideUserLog} from "../data/loungeSideUserLog";
import {Sides} from "../enums/side";

const Log = () => {
    const [showInventoryTable, setShowInventoryTable ] = useState(false);
    const [showInventoryAdditionInfo, setShowInventoryAdditionInfo ] = useState(false);
    const [showInventoryRemovalInfo, setShowInventoryRemovalInfo ] = useState(false);
    const [showLiquorDeletion, setShowLiquorDeletion ] = useState(false);
    const [showLiquorAddition, setShowLiquorAddition ] = useState(false);
    const [empNameFilters, setEmpNameFilters ] = useState([]);
    const [liqNameFilters, setLiqNameFilters ] = useState([]);
    const [fetchFilters, setFetchFilters ] = useState(false);
    const [side, setSide ] = useState('');
    const [sideSelected, setSideSelected] = useState(false);
    const [viewAdditionRecord, setViewAdditionRecord] = useState({} as InventoryAdditionLogType )
    const [viewRemovalRecord, setViewRemovalRecord] = useState( {} as InventoryRemovalLogType)
    const [liquorAdditionRecord, setLiquorAdditionRecord] = useState({} as LiquorAdditionLogType )
    const [liquorDeletionRecord, setLiquorDeletionRecord] = useState( {} as LiquorDeletionLogType)
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const setFilters = async () => {
            if (showInventoryTable){
                EmployeeNames.forEach(function (emp) {
                    const empNameFilter = {
                        text: `${emp.name}`,
                        value: `${emp.name}`,
                    }
                    empNameFilters.push(empNameFilter);
                });
                PubDrinkNames.forEach(function (name) {
                    const liquorNameFilter = {
                        text: `${name.name}`,
                        value: `${name.name}`,
                    }
                    liqNameFilters.push(liquorNameFilter)
                });
                setFetchFilters(false);
            }
        }
        setFilters();
    }, [showInventoryTable]);


    useEffect(() => {
        const getTableData = async () => {
            if (side == Sides.pubSide) {
                setTableData(PubSideUserLog);
            } else if (side == Sides.loungeSide) {
                setTableData(LoungeSideUserLog);
            }
        }
        getTableData();
    }, [side]);


    const view = (record: any) => {
        if (record.employeeAction == Actions.InventoryAddition) {
            setShowInventoryAdditionInfo(true);
            const additionLogData = EmployeeInventoryAdditionLog.find(x => x.id === record.id)
            const additionInfo = {
                employeeName: record.employeeName,
                date: record.date,
                vendor: record.vendor,
                liquorName: record.liquorName,
                quantityBefore: additionLogData.quantityBefore,
                quantityAdded: additionLogData.quantityAdded,
                quantityAfter: additionLogData.quantityAfter,
            } as InventoryAdditionLogType
            setViewAdditionRecord(additionInfo);
        } else if (record.employeeAction == Actions.InventoryRemoval){
            setShowInventoryRemovalInfo(true);
            const removalLogData = EmployeeInventoryRemovalLog.find(x => x.id === record.id)
            const removalInfo = {
                employeeName: record.employeeName,
                date: record.date,
                vendor: record.vendor,
                liquorName: record.liquorName,
                quantityBefore: removalLogData.quantityBefore,
                quantityRemoved: removalLogData.quantityTaken,
                quantityAfter: removalLogData.quantityAfter,
            } as InventoryRemovalLogType
           setViewRemovalRecord(removalInfo);
        }  else if (record.employeeAction == Actions.LiquorAddition){
            setShowLiquorAddition(true);
            const additionData = EmployeeLiquorAdditionLog.find(x => x.id === record.id)
            const additionInfo = {
                employeeName: record.employeeName,
                date: record.date,
                vendor: record.vendor,
                liquorName: record.liquorName,
                quantityWhenAdded: additionData.quantity,
            } as LiquorAdditionLogType
            setLiquorAdditionRecord(additionInfo)
        } else if (record.employeeAction == Actions.Deletion){
            setShowLiquorDeletion(true);
            const deletionData = EmployeeLiquorDeletionLog.find(x => x.id === record.id)
            const deletionInfo = {
                employeeName: record.employeeName,
                date: record.date,
                vendor: record.vendor,
                liquorName: record.liquorName,
                quantityAtDelete: deletionData.quantityAtDelete,
            } as LiquorDeletionLogType
           setLiquorDeletionRecord(deletionInfo);
        }

    }

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
            filters: empNameFilters,
            onFilter: (value, record) => record.employeeName.includes(value),
            filterSearch: true,
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
            onFilter: (value, record) => record.employeeAction.includes(value),
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
                    value: Vendors.badgerLiquor,
                },
            ],
            onFilter: (value, record) => record.vendor.includes(value),
            filterSearch: true,
        },
        {
            title: 'Liquor Name',
            dataIndex: 'liquorName',
            filters: liqNameFilters,
            onFilter: (value, record) => record.liquorName.includes(value),
            filterSearch: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <>
                        <Space size="middle">
                            <Typography.Link onClick={() => view(record)}>
                                View Details
                            </Typography.Link>
                        </Space>
                    </>
                )
            },
        },
    ];

    return (
        <>
            <div className={styles.headers}>
                <div className={styles.selectors}>
                    <SideSelector setSide={setSide} setSelected={setSideSelected} setFetchTableData={setShowInventoryTable}/>
                    <MonthSelecter setTableData={setTableData} side={side}/>
                </div>
            </div>
            {showInventoryTable ? (
                <div>
                    <Table columns={columns} dataSource={tableData} />
                </div>
            ) : (
                <></>
            )}
                <InventoryAdditionModalLog showModal={showInventoryAdditionInfo} setShowModal={setShowInventoryAdditionInfo} record={viewAdditionRecord}/>
            <InventoryRemovalModalLog showModal={showInventoryRemovalInfo} setShowModal={setShowInventoryRemovalInfo} record={viewRemovalRecord}/>
            <LiquorDeletionModalLog showModal={showLiquorDeletion} setShowModal={setShowLiquorDeletion} record={liquorDeletionRecord}/>
            <LiquorAdditionModalLog showModal={showLiquorAddition} setShowModal={setShowLiquorAddition} record={liquorAdditionRecord}/>
            </>
    );

}

export default Log;