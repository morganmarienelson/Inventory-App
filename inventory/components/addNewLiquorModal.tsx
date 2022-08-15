import {Button, Form, Input, InputNumber, Modal, Select} from "antd";
import React, {useState} from "react";
import styles from "./css/modal.module.css"
import {Drink} from "../types/drink";
import {pubDrinks} from "../data/pubDrinks";
import {loungeDrinks} from "../data/loungeDrinks";
import {Brands} from "../enums/brands";


interface AddNewLiquorModalProps{
    showAddModal: boolean;
    setShowAddModal : (showAddModal: boolean) => void;
}

const AddNewLiquorModal: React.FC<AddNewLiquorModalProps> = ({showAddModal, setShowAddModal}) => {
    const [pubQuantity, setPubQuantity ] = useState(0);
    const [loungeQuantity, setLoungeQuantity ] = useState(0);

    const onModalOkCancel = () => {
        Modal.confirm({
            title: "Are you sure that you want to close this form? This new liquor has not been saved. You did not press submit.",
            onOk: () => {
                setShowAddModal(false);
            },
        });
    };

    const onFinish = async (values: any) => {
        //TODO: check to make suer drink is already not in database
        const newLiquor = values;
        const newPubDrink = {
            brand: newLiquor.brand,
            name: newLiquor.name,
            quantity: pubQuantity,
        } as Drink
        const newLoungeDrink = {
            brand: newLiquor.brand,
            name: newLiquor.name,
            quantity: loungeQuantity,
        } as Drink
        //TODO: force a re generation of table once added to database
        pubDrinks.push(newPubDrink);
        loungeDrinks.push(newLoungeDrink);
        setShowAddModal(false);
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    const onPubQuantityChange = (value: number) => {
        setPubQuantity(value);
    };


    const onLoungeQuantityChange = (value: number) => {
        setLoungeQuantity(value);
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
                        <Select.Option value={Brands.generalBeverage}>{Brands.generalBeverage}</Select.Option>
                        <Select.Option value={Brands.triangleDistributing}>{Brands.triangleDistributing}</Select.Option>
                        <Select.Option value={Brands.badgerLiquor}>{Brands.badgerLiquor}</Select.Option>
                        <Select.Option value={Brands.breakThru}>{Brands.breakThru}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Name" name="name"  rules={[
                    {
                        required: true,
                    },
                ]} >
                    <Input  />
                </Form.Item>
                <Form.Item label="Pub Side Quantity" name="pubQuantity" rules={[
                    {
                        required: true,
                    },
                ]} >
                    <InputNumber  min={0} value={pubQuantity} onChange={onPubQuantityChange}/>
                </Form.Item>
                <Form.Item label="Lounge Side Quantity" name="loungeQuantity"  rules={[
                    {
                        required: true,
                    },
                ]} >
                    <InputNumber  min={0}  value={loungeQuantity}  onChange={onLoungeQuantityChange}/>
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