import {Button, Form, Input, InputNumber, Modal, Select} from "antd";
import React, {useState} from "react";
import styles from "./css/modal.module.css"
import {Vendors} from "../enums/vendors";


interface AddNewLiquorModalProps{
    showAddModal: boolean;
    setShowAddModal : (showAddModal: boolean) => void;
    side: string;
}

const AddNewLiquorModal: React.FC<AddNewLiquorModalProps> = ({showAddModal, setShowAddModal, side}) => {
    const [quantity, setQuantity ] = useState(0);

    const onModalOkCancel = () => {
        Modal.confirm({
            title: "Are you sure that you want to close this form? This new liquor has not been saved. You did not press submit.",
            onOk: () => {
                setShowAddModal(false);
            },
        });
    };

    const onFinish = async (values: any) => {
        const newLiquor = values;

        //TODO: force a re generation of table once added to database
     
        setShowAddModal(false);
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
                <Form.Item label="Brand"  name="brand"    rules={[
                    {
                        required: true,
                    },
                ]}>
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
                <Form.Item label="Name" name="name"  rules={[
                    {
                        required: true,
                    },
                ]} >
                    <Input style={{
                    width: 250,
                }} placeholder="Enter Name" />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity"  >
                    <InputNumber  min={0}  value={quantity}  defaultValue={0} onChange={onQuantityChange}/>
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