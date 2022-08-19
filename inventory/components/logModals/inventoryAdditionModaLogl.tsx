import { Modal} from "antd";
import React from "react";
import styles from "./css/modal.module.css";
import {InventoryAdditionLogType} from "../types/inventoryAdditionLogType";

interface InventoryAdditionModalLogProps{
    showModal: boolean;
    setShowModal : (showUpdate: boolean) => void;
    record: InventoryAdditionLogType;
}

const InventoryAdditionModalLog: React.FC<InventoryAdditionModalLogProps> = ({showModal, setShowModal, record}) => {

    const onModalOkCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal visible={showModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.name}>Liquor Addition By: {record.employeeName} on {record.date}</div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Liquor: {record.liquorName} from {record.vendor}
                </div>
            </div>
                <div className={styles.quantityContainer}>
                    <div className={styles.quantityHeader}>
                        Number of Units Before Addition: {record.quantityBefore}
                    </div>
                </div>
                <div className={styles.quantityContainer}>
                    <div className={styles.quantityHeader}>
                        Number of Units Added: {record.quantityAdded}
                    </div>
                </div>
                <div className={styles.quantityContainer}>
                    <div className={styles.quantityHeader}>
                        Number of Units After Addition: {record.quantityAfter}
                    </div>
                </div>
        </Modal>
    )
}

export default InventoryAdditionModalLog;