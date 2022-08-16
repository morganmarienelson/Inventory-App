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
    record: Drink;
}

const InventoryRemovalModal: React.FC<InventoryRemovalModalProps> = ({showModal, setShowModal, record}) => {
    const [quantityTaken, setQuantityTaken] = useState(0);
    const [quantityAfter, setQuantityAfter] = useState(0);
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
        //TODO: add an update to current drink record, add removal action
        setQuantityAfter(record.quantity);
        setQuantityTaken(0);
        setShowModal(false);
        message.success("The quantity has been updated", 2);
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