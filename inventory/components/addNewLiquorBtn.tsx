import {Button} from "antd";
import React, {useState} from "react";
import AddNewLiquorModal from "./addNewLiquorModal";
import styles from "./css/addBtn.module.css";
import {Drink} from "../types/drink";

interface AddNewLiquorBtnProps{
    side: string;
    setEditingRecord : (editingRecord: Drink) => void;
}

const AddNewLiquorBtn: React.FC<AddNewLiquorBtnProps> = ({side, setEditingRecord}) =>{
    const [showAddModal, setShowAddModal] = useState(false)

    const onAddBtnClick = () =>{
        setShowAddModal(true);
    }

    return (
        <>
            <AddNewLiquorModal side={side} showAddModal={showAddModal} setShowAddModal={setShowAddModal} setEditingRecord={setEditingRecord}/>
        <Button onClick={onAddBtnClick} type="primary" className={styles.btn}>
            <div  className={styles.label}>Add New Liquor</div>
        </Button>
</>
    )

}

export default AddNewLiquorBtn;