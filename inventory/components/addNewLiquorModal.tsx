import {Button, Form, Input, InputNumber, message, Modal, Select} from "antd";
import React, {useState} from "react";
import styles from "./css/modal.module.css"
import {Vendors} from "../enums/vendors";
import { Sides } from "../enums/side";


interface AddNewLiquorModalProps{
    showAddModal: boolean;
    setShowAddModal : (showAddModal: boolean) => void;
    side: string;
}

const AddNewLiquorModal: React.FC<AddNewLiquorModalProps> = ({showAddModal, setShowAddModal, side}) => {
    const [quantity, setQuantity ] = useState(0);

    const onModalOkCancel = () => {
        Modal.confirm({
            title: "Are you sure that you want to close this form? This new liquor has not been added. You did not press submit.",
            onOk: () => {
                setShowAddModal(false);
            },
        });
    };

    const onFinish = async (values: any) => {
        if (side == Sides.pubSide){
            try {
                const res = await fetch('http://localhost:3000/api/pubDrinks', {
                    method: 'POST',
                    headers: {
                         "Accept": "application/json",
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                message.success("Liquor has been added to the inventory on the Pub Side", 2);
                setShowAddModal(false);
            } catch (error) {
                //TODO: handle the frontend display of non unique name
                //TODO: handle the frontend display of any others errors
                console.log(error); 
            }
        } else if (side == Sides.loungeSide){
            try {
                const res = await fetch('http://localhost:3000/api/loungeDrinks', {
                    method: 'POST',
                    headers: {
                         "Accept": "application/json",
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                })
                message.success("Liquor has been added to the inventory on the Lounge Side", 2);
                setShowAddModal(false);
            } catch (error) {
                //TODO: handle the frontend display of non unique name
                message.error("A liquor with this name already exists in the database. Please enter a different name or look for this liquor in the inventory table.", 2);
                //TODO: handle the frontend display of any others errors
                message.error("Something went wrong. This liquor could not be added", 2);
            }
        }
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    const onQuantityChange = (value: number) => {
        setQuantity(value);
    };


    return (
        <Modal visible={showAddModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.title}>{side}: New Liquor Information</div>
            <Form name="New Liquor" className={styles.form} onFinish={onFinish} validateMessages={validateMessages}
            >
                <Form.Item label="Vendor"  name="vendor"    rules={[
                    {
                        required: true,
                    },
                ]} className={styles.formItem}>
                    <Select  placeholder="Select Vendor"
                style={{
                    width: 250,
                }}>
                        <Select.Option value={Vendors.generalBeverage}>{Vendors.generalBeverage}</Select.Option>
                        <Select.Option value={Vendors.triangleDistributing}>{Vendors.triangleDistributing}</Select.Option>
                        <Select.Option value={Vendors.badgerLiquor}>{Vendors.badgerLiquor}</Select.Option>
                        <Select.Option value={Vendors.breakThru}>{Vendors.breakThru}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item className={styles.formItem} label="Name" name="name"  rules={[
                    {
                        required: true,
                    },
                ]} >
                    <Input style={{
                    width: 250,
                }} placeholder="Enter Name" />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity" className={styles.quantityItem}  rules={[{
                    required: true,
                    message: "A number must be entered!",
                    pattern: new RegExp(/^[0-9]+$/)
                }]}  >
                    <InputNumber  min={0}  value={quantity} onChange={onQuantityChange}/>
                </Form.Item>
                <Form.Item  className={styles.submitBtn}
                >
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )


}

export default AddNewLiquorModal;