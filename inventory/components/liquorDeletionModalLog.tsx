import {Modal} from "antd";
import React from "react";
import styles from "./css/modal.module.css";
import {LiquorDeletionLogType} from "../types/liquorDeletionLogType";

interface LiquorDeletionModalLogProps{
    showModal: boolean;
    setShowModal : (showUpdate: boolean) => void;
    record: LiquorDeletionLogType;
}

const LiquorDeletionModalLog: React.FC<LiquorDeletionModalLogProps> = ({showModal, setShowModal, record}) => {

    const onModalOkCancel = () => {
        setShowModal(false);
    };

    return (
        <Modal visible={showModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.name}>Liquor Deletion By: {record.employeeName} on {record.date}</div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Liquor: {record.liquorName} from {record.vendor}
                </div>
            </div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Number of Units At Deletion: {record.quantityAtDelete}
                </div>
            </div>
        </Modal>
    )
}

export default LiquorDeletionModalLog;