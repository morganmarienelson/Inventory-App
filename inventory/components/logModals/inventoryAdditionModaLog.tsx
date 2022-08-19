import {Modal, Table} from "antd";
import React from "react";
import styles from "../css/modal.module.css";
import {InventoryAdditionLogType} from "../../types/inventoryAdditionLogType";

interface InventoryAdditionModalLogProps{
    showModal: boolean;
    setShowModal : (showUpdate: boolean) => void;
    record: InventoryAdditionLogType;
}

const InventoryAdditionModalLog: React.FC<InventoryAdditionModalLogProps> = ({showModal, setShowModal, record}) => {

    const onModalOkCancel = () => {
        setShowModal(false);
    };

    const dataSource = [
        {
            quantityBefore: record.quantityBefore,
            quantityAdded: record.quantityAdded,
            quantityAfter: record.quantityAfter,
        },
    ];

    const columns = [
        {
            title: 'Quantity Before',
            dataIndex: 'quantityBefore',
            key: 'quantityBefore',
        },
        {
            title: 'Units Added',
            dataIndex: 'quantityAdded',
            key: 'quantityAdded',
        },
        {
            title: 'Quantity After',
            dataIndex: 'quantityAfter',
            key: 'quantityAfter',
        },
    ];

    return (
        <Modal visible={showModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.liquorName}>Inventory Addition </div>
            <div className={styles.liquorName}>{record.liquorName} </div>
            <div className={styles.inventoryContainer}>
                <div className={styles.nameDate}>
                    By: {record.employeeName} on {record.date}
                </div>
            </div>
            <div className={styles.table}>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </Modal>
    )
}

export default InventoryAdditionModalLog;