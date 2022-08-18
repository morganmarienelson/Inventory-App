import {Modal} from "antd";
import React from "react";
import styles from "./css/modal.module.css";
import {LiquorAdditionLogType} from "../types/liquorAdditionLogType";

interface LiquorAdditionModalLogProps{
    showModal: boolean;
    setShowModal : (showUpdate: boolean) => void;
    record: LiquorAdditionLogType;
}

const LiquorAdditionModalLog: React.FC<LiquorAdditionModalLogProps> = ({showModal, setShowModal, record}) => {

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
                    Number of Units When Added: {record.quantityWhenAdded}
                </div>
            </div>
        </Modal>
    )
}

export default LiquorAdditionModalLog;