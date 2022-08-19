import {Modal, Table} from "antd";
import React from "react";
import styles from "../css/modal.module.css";
import {LiquorAdditionLogType} from "../../types/liquorAdditionLogType";

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
            <div className={styles.name}>Liquor Addition </div>
            <div className={styles.liquorName}>{record.liquorName} </div>
            <div className={styles.inventoryContainer}>
                <div className={styles.nameDate}>
                    By: {record.employeeName} on {record.date}
                </div>
            </div>
            <div className={styles.liquorQuantity}>
                Quantity at Addition: {record.quantityWhenAdded}
            </div>
        </Modal>
    )
}

export default LiquorAdditionModalLog;