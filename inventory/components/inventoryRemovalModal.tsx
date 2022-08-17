import {InputNumber, Modal, Form, Button, Select, message} from "antd";
import React, { useState} from "react";
import emailjs from 'emailjs-com';
import {Drink} from "../types/drink";
import styles from "./css/modal.module.css";
import {Sides} from "../enums/side";
import EmployeeSelector from "./employeeSelector";

interface InventoryRemovalModalProps {
    showModal: boolean;
    setShowModal: (showUpdate) => void;
    record: any;
    side: string,
}


const InventoryRemovalModal: React.FC<InventoryRemovalModalProps> = ({showModal, setShowModal, record, side}) => {
    const [quantityTaken, setQuantityTaken] = useState(0);
    const [quantityAfter, setQuantityAfter] = useState(record.quantity);
    const [employee, setEmployee] = useState('');

    const onEmployeeChange = (value: string) => {
        setEmployee(value)
    };

    //TODO: test email then call function in on finish
    const sendEmail = () => {
        // emailjs.send("service_ui2rj0j","template_m50q7pp",{
        //     name: newRecord.name,
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
                message.warn("Units of selected liquor has not been changed")
                setShowModal(false);
            },
        });
    };

    const onQuantityAddedChange = (e: number) =>{
        setQuantityTaken(e);
        setQuantityAfter(record.quantity - e);
    }

    const onFinish = async (values: any) => {
        console.log(values);
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
                        "Accept": "applicattiton/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedLiquor)
                    });
                    message.success("The quantity has been updated", 2);
                } catch (error){
                    console.log(error);
                    message.error("Deletion failed")
                } 
            }
             else if (side == Sides.loungeSide){
                try {
                    const res = await fetch(`http://localhost:3000/api/loungeDrinks/${liquorId}`, 
                    {
                    method: 'PUT',
                    headers: {
                        "Accept": "applicattiton/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedLiquor)
                    });
                    message.success("The quantity has been updated", 2);
                } catch (error){
                    console.log(error);
                    message.error("Deletion failed")
                } 
            }
        setShowModal(false)
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

export default InventoryRemovalModal;