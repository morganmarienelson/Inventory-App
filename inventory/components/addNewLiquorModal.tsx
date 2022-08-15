import {Button, Form, Input, InputNumber, Modal, Select} from "antd";
import React from "react";
import styles from "./css/modal.module.css"


interface AddNewLiquorModalProps{
    showAddModal: boolean;
    setShowAddModal : (showAddModal: boolean) => void;
}

const AddNewLiquorModal: React.FC<AddNewLiquorModalProps> = ({showAddModal, setShowAddModal}) => {

    const onModalOkCancel = () => {
        Modal.confirm({
            title: "Are you sure that you want to close this form? This new liquor has not been saved. You did not press submit.",
            onOk: () => {
                setShowAddModal(false);
            },
        });
    };

    const onFinish = async (values: any) => {
        const neqLiquor = values;
        // const response = await fetch('api/matches', {
        //     method: 'POST',
        //     body: JSON.stringify({ match }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        // const data = await response.json();
        setShowAddModal(false);
    };


    const validateMessages = {
        required: '${label} is required!',
    };


    return (
        <Modal visible={showAddModal} onCancel={onModalOkCancel} onOk={onModalOkCancel} destroyOnClose={true}>
            <div className={styles.title}>New Liquor Information</div>
            <Form name="New Liquor" className={styles.form} onFinish={onFinish} validateMessages={validateMessages}
            >
                <Form.Item label="Brand"  name="brand"    rules={[
                    {
                        required: true,
                    },
                ]}>
                    <Select>
                        <Select.Option value="genBev">General Beverage</Select.Option>
                        <Select.Option value="triDist">Triangle Distributing</Select.Option>
                        <Select.Option value="badgeLiq">Badger Liquor</Select.Option>
                        <Select.Option value="breakThru">Break Thru</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Name" name="name"  rules={[
                    {
                        required: true,
                    },
                ]} >
                    <Input  />
                </Form.Item>
                <Form.Item label="Pub Side Quantity" name="pubQuantity"  rules={[
                    {
                        required: true,
                    },
                ]} >
                    <InputNumber  min={0}/>
                </Form.Item>
                <Form.Item label="Lounge Side Quantity" name="loungeQuantity"  rules={[
                    {
                        required: true,
                    },
                ]} >
                    <InputNumber  min={0}/>
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