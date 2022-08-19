import {InputNumber, Modal, Form, Button, Select, message} from "antd";
import React, { useState} from "react";
import emailjs from 'emailjs-com';
import {DrinkType} from "../../types/drinkType";
import styles from "../css/modal.module.css";
import {Sides} from "../../enums/side";
import {LiquorInventoryMessages} from "../../enums/liquorInventoryMessages";
import {UserActionMessages} from "../../enums/userActionMessages";

interface InventoryRemovalModalProps {
    showModal: boolean;
    setShowModal: (showUpdate) => void;
    record: any;
    side: string,
    setFetchTableData : (fetchTableData: boolean) => void;
    employee: string;
}


const InventoryRemovalModal: React.FC<InventoryRemovalModalProps> = ({showModal, employee, setShowModal, record, side, setFetchTableData}) => {
    const [quantityTaken, setQuantityTaken] = useState(0);
    const [quantityAfter, setQuantityAfter] = useState(record.quantity);


    //TODO: test email then call function in on finish
    const sendEmail = () => {
        // emailjs.send("service_ui2rj0j","template_m50q7pp",{
        //     liquorName: newRecord.liquorName,
        //     quantity: newRecord.quantity,
        // }, "3yQIUtvE5NvXus_g4").then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    const onModalOkCancel = () => {
        Modal.confirm({
            title: "Are you sure that you want to close this form? The addition has not been recorded. You did not press submit.",
            onOk: () => {
                message.warn(LiquorInventoryMessages.inventoryUpdateWarning);
                setShowModal(false);
            },
        });
    };

    const onQuantityAddedChange = (e: number) =>{
        setQuantityTaken(e);
        setQuantityAfter(record.quantity - e);
    }

    const recordEmployeeInventoryRemovalAction = async (record: DrinkType, id: string) =>{
        let today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();
        const inventoryRemoval = {
            employee: employee,
            productId: id,
            quantityBefore: record.quantity,
            quantityTaken: quantityTaken,
            quantityAfter: quantityAfter,
            date: date,
            side: side,
        }
        try {
            const res = await fetch('http://localhost:3000/api/inventoryRemovals', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inventoryRemoval)
            })
            if (res.ok){
                message.success(UserActionMessages.inventoryRemovalSuccess, 2);
            } else {
                message.error(UserActionMessages.inventoryRemovalError, 2);
            }
        } catch (error) {
            console.log(error);
            message.error(UserActionMessages.inventoryRemovalError);
        }
    }

    const onFinish = async (values: any) => {
        const liquorId = record._id;
        const updatedLiquor = {
            _id: liquorId,
            vendor: record.vendor,
            liquorName: record.name,
            quantity: quantityAfter,
        }
                if (side == Sides.pubSide){
                try {
                    const res = await fetch(`http://localhost:3000/api/pubDrinks/${liquorId}`, 
                    {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedLiquor)
                    });
                    if (res.ok){
                        message.success(LiquorInventoryMessages.inventoryUpdateSuccess, 2);
                        setFetchTableData(true);
                        setShowModal(false);
                        await recordEmployeeInventoryRemovalAction(record, liquorId);
                    } else {
                        message.error(LiquorInventoryMessages.inventoryUpdateError, 2);
                    }
                } catch (error){
                    console.log(error);
                    message.error(LiquorInventoryMessages.inventoryUpdateError, 2);
                }
            }
             else if (side == Sides.loungeSide){
                try {
                    const res = await fetch(`http://localhost:3000/api/loungeDrinks/${liquorId}`, 
                    {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedLiquor)
                    });
                    if (res.ok){
                        message.success(LiquorInventoryMessages.inventoryUpdateSuccess, 2);
                        setFetchTableData(true);
                        setShowModal(false);
                        await recordEmployeeInventoryRemovalAction(record, liquorId);
                    } else {
                        message.error(LiquorInventoryMessages.inventoryUpdateError, 2);
                    }
                } catch (error){
                    console.log(error);
                    message.error(LiquorInventoryMessages.inventoryUpdateError, 2);
                }
            }
    };

    return (
        <Modal visible={showModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.liquorName}>{record.liquorName}</div>
            <Form name="New Liquor" className={styles.form} onFinish={onFinish} validateMessages={validateMessages}>
                <div className={styles.quantityContainer}>
                    <div className={styles.quantityHeader}>
                        Current Number of Units: {record.quantity}
                    </div>
                </div>
                <div className={styles.unitsAdded}>
                    <div className={styles.quantityHeader}>
                        Units Taken:
                    </div>
                    <div>
                        <Form.Item name="quantityAdded"  rules={[{
                            required: true,
                            message: "A number must be entered!",
                            pattern: new RegExp(/^[0-9]+$/)
                        }]}  >
                            <InputNumber min={0} max={record.quantity} name="quantityAfter" value={quantityTaken} onChange={onQuantityAddedChange} />
                        </Form.Item>
                    </div>
                </div>
                <div className={styles.quantityContainer}>
                    <div className={styles.quantityHeader}>
                        Number of Units After Removal: {quantityAfter}
                    </div>
                </div>
                <Form.Item  className={styles.submitBtnUpdate}
                >
                    <Button type="primary" htmlType="submit" className={styles.submitBtn} >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default InventoryRemovalModal;