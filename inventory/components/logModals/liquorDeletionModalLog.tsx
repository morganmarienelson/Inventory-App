import {Modal} from "antd";
import React from "react";
import styles from "../css/modal.module.css";
import {LiquorDeletionLogType} from "../../types/liquorDeletionLogType";

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
            <div className={styles.name}>Liquor Deletion </div>
            <div className={styles.liquorName}>{record.liquorName} </div>
            <div className={styles.inventoryContainer}>
                <div className={styles.nameDate}>
                    By: {record.employeeName} on {record.date}
                </div>
            </div>
            <div className={styles.liquorQuantity}>
                Quantity at Deletion: {record.quantityAtDelete}
            </div>
        </Modal>
    )
}

export default LiquorDeletionModalLog;