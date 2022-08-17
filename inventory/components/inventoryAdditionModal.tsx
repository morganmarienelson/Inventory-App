import {InputNumber, Modal, Form, Button, Select, message} from "antd";
import React, { useState} from "react";
import styles from "./css/modal.module.css";
import {Sides} from "../enums/side";
import EmployeeSelector from "./employeeSelector";
import {Drink} from "../types/drink";
import {LiquorInventoryMessages} from "../enums/liquorInventoryMessages";
import {UserActionMessages} from "../enums/userActionMessages";

interface InventoryAdditionModalProps{
    showModal: boolean;
    setShowModal : (showUpdate: boolean) => void;
    record: Drink;
    side: string;
    setFetchTableData : (fetchTableData: boolean) => void;
}

const InventoryAdditionModal: React.FC<InventoryAdditionModalProps> = ({showModal, setShowModal, record, side, setFetchTableData}) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const [quantityAfter, setQuantityAfter] = useState(record.quantity);
    const [employee, setEmployee] = useState('');

    const onEmployeeChange = (value: string) => {
        setEmployee(value)
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    const onModalOkCancel = () => {
        Modal.confirm({
            title: "Are you sure that you want to close this form? The addition has not been recorded. You did not press submit.",
            onOk: () => {
                message.warn(LiquorInventoryMessages.inventoryUpdateWarning)
                setShowModal(false);
            },
        });
    };

    const onQuantityAddedChange = (e: number) =>{
        setQuantityAdded(e);
        setQuantityAfter(e + record.quantity);
    }

    const recordEmployeeInventoryAdditionAction = async (record: Drink, id: string) =>{
        let today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + ':' + today.getMinutes();
        const inventoryAddition = {
            employee: employee,
            productId: id,
            quantityBefore: record.quantity,
            quantityAdded: quantityAdded,
            quantityAfter: quantityAfter,
            date: date,
            side: side,
        }
        try {
            const res = await fetch('http://localhost:3000/api/inventoryAdditions', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inventoryAddition)
            })
            if (res.ok){
                message.success(UserActionMessages.inventoryAdditionSuccess, 2);
            } else {
                message.error(UserActionMessages.inventoryAdditionError, 2);
            }
        } catch (error) {
            console.log(error);
            message.error(UserActionMessages.inventoryAdditionError);
        }
    }

     const onFinish = async (values: any) => {
        const liquorId = record._id; 
        const updatedLiquor = {
            _id: liquorId,
            vendor: record.vendor,
            name: record.name,
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
                    if (res.ok) {
                        message.success(LiquorInventoryMessages.inventoryUpdateSuccess, 2);
                        await recordEmployeeInventoryAdditionAction(record, liquorId);
                        setFetchTableData(true);
                        setShowModal(false);
                    } else {
                        message.error(LiquorInventoryMessages.inventoryUpdateError);
                    }
                }
                catch (error){
                    console.log(error);
                    message.error(LiquorInventoryMessages.inventoryUpdateError);
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
                    if (res.ok) {
                        message.success(LiquorInventoryMessages.inventoryUpdateSuccess, 2);
                        await recordEmployeeInventoryAdditionAction(record, liquorId);
                        setShowModal(false);
                        setFetchTableData(true);
                    } else {
                        message.error(LiquorInventoryMessages.inventoryUpdateError)
                    }
                }
                catch (error){
                    console.log(error);
                    message.error(LiquorInventoryMessages.inventoryUpdateError)
                }
            }
    };

    return (
        <Modal visible={showModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.name}>{record.name}</div>
            <Form name="New Liquor" className={styles.form} onFinish={onFinish} validateMessages={validateMessages}>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Current Number of Units: {record.quantity}
                </div>
            </div>
            <div className={styles.unitsAdded}>
                <div className={styles.quantityHeader}>
                    Units Added:
                </div>
                <div>
                    <Form.Item name="quantityAdded"  rules={[{
                        required: true,
                        message: "A number must be entered!",
                        pattern: new RegExp(/^[0-9]+$/)
                    }]}  >
                        <InputNumber min={0} name="quantityAfter" value={quantityAdded} onChange={onQuantityAddedChange} />
                    </Form.Item>
                </div>
            </div>
            <div className={styles.quantityContainer}>
                <div className={styles.quantityHeader}>
                    Number of Units After Addition: {quantityAfter}
                </div>
            </div>
                <div className={styles.unitsAdded}>
                    <div className={styles.quantityHeader}>
                       Employee Name:
                    </div>
                    <div>
                    <EmployeeSelector onEmployeeChange={onEmployeeChange}/>
                    </div>
                </div>
                <Form.Item  className={styles.submitBtn}
                >
            <Button type="primary" htmlType="submit" className={styles.submitBtn} >
                Submit
            </Button>
                    </Form.Item>
        </Form>
        </Modal>
        )
}

export default InventoryAdditionModal;