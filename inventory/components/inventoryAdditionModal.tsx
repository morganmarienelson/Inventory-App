import {InputNumber, Modal, Form, Button, Select, message} from "antd";
import React, {useEffect, useState} from "react";
import {Drink} from "../types/drink";
import styles from "./css/modal.module.css";
import {Sides} from "../enums/side";
import {loungeDrinks} from "../data/loungeDrinks";
import {pubDrinks} from "../data/pubDrinks";
import EmployeeSelector from "./employeeSelector";

interface InventoryAdditionModalProps{
    showModal: boolean;
    setShowModal : (showUpdate) => void;
    record: Drink;
}

const InventoryAdditionModal: React.FC<InventoryAdditionModalProps> = ({showModal, setShowModal, record}) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const [quantityAfter, setQuantityAfter] = useState(0);
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
                message.warn("Units of selected liquor was not changed")
                setShowModal(false);
            },
        });
    };

    const onQuantityAddedChange = (e: number) =>{
        setQuantityAdded(e);
        setQuantityAfter(e + record.quantity);
    }

     const onFinish = async (values: any) => {
        console.log(values);
        //TODO: add an update to current drink record, add addition action
        setShowModal(false)
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