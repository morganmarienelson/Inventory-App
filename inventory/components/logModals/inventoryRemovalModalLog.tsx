import {Modal, Table} from "antd";
import React from "react";
import styles from "../css/modal.module.css";
import {InventoryRemovalLogType} from "../../types/inventoryRemovalLogType";

interface InventoryRemovalModalLogProps{
    showModal: boolean;
    setShowModal : (showUpdate: boolean) => void;
    record: InventoryRemovalLogType;
}

const InventoryRemovalModalLog: React.FC<InventoryRemovalModalLogProps> = ({showModal, setShowModal, record}) => {

    const onModalOkCancel = () => {
        setShowModal(false);
    };

    const dataSource = [
        {
            quantityBefore: record.quantityBefore,
            quantityRemoved: record.quantityRemoved,
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
            title: 'Units Removed',
            dataIndex: 'quantityRemoved',
            key: 'quantityRemoved',
        },
        {
            title: 'Quantity After',
            dataIndex: 'quantityAfter',
            key: 'quantityAfter',
        },
    ];

    return (
        <Modal visible={showModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.liquorName}>Inventory Removal </div>
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

export default InventoryRemovalModalLog;