import { InputNumber, Modal} from "antd";
import React, { useState} from "react";
import emailjs from 'emailjs-com';
import {Drink} from "../types/drink";
import styles from "./css/editingInventoryModal.module.css";

interface UpdateInventoryModalProps{
    showUpdateModal: boolean;
    setShowUpdateModal : (showUpdate) => void;
    record: Drink;
}

const EditInventoryModal: React.FC<UpdateInventoryModalProps> = ({showUpdateModal, setShowUpdateModal, record}) => {
    const [quantity, setQuantity] = useState(record.quantity);

    const sendEmail = () => {
        const newRecord = {
            name: record.name,
            quantity: quantity,
        }
        console.log(newRecord);
        // emailjs.send("service_ui2rj0j","template_m50q7pp",{
        //     name: newRecord.name,
        //     quantity: newRecord.quantity,
        // }, "3yQIUtvE5NvXus_g4").then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
    };

    const onOk = () => {
        console.log(quantity);
        //TODO: what quantities do you want email sent
        if (quantity == 0){
            sendEmail();
        }
        setShowUpdateModal(false);
    }

    const onCancel = () =>{
        setShowUpdateModal(false);

    }

    const onQuantityChange = (e) =>{
        setQuantity(e);
    }

    return (
        <Modal visible={showUpdateModal} onCancel={onCancel} onOk={onOk} destroyOnClose={true}>
            <div className={styles.name}>{record.name}</div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Quantity:
                </div>
                <div>
                    <InputNumber min={0} max={10} defaultValue={record.quantity} name="quantity" onChange={onQuantityChange}/>
                </div>
            </div>
        </Modal>
        )


}

export default EditInventoryModal;