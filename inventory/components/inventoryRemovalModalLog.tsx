import {Modal} from "antd";
import React from "react";
import styles from "./css/modal.module.css";
import {InventoryRemovalLogType} from "../types/inventoryRemovalLogType";

interface InventoryRemovalModalLogProps{
    showModal: boolean;
    setShowModal : (showUpdate: boolean) => void;
    record: InventoryRemovalLogType;
}

const InventoryRemovalModalLog: React.FC<InventoryRemovalModalLogProps> = ({showModal, setShowModal, record}) => {

    const onModalOkCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal visible={showModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.name}>Inventory Removal By: {record.employeeName} on {record.date}</div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Liquor: {record.liquorName} from {record.vendor}
                </div>
            </div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Number of Units Before Removal: {record.quantityBefore}
                </div>
            </div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Number of Units Removed: {record.quantityRemoved}
                </div>
            </div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Number of Units After Removal: {record.quantityAfter}
                </div>
            </div>
        </Modal>
    )
}

export default InventoryRemovalModalLog;