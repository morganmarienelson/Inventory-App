import {Button} from "antd";
import React, {useState} from "react";
import AddNewLiquorModal from "./tableModals/addNewLiquorModal";
import styles from "./css/addBtn.module.css";

interface AddNewLiquorBtnProps{
    side: string;
    setFetchTableData : (fetchTableData: boolean) => void;
    employee: string;
}

const AddNewLiquorBtn: React.FC<AddNewLiquorBtnProps> = ({side, setFetchTableData,  employee}) =>{
    const [showAddModal, setShowAddModal] = useState(false)

    const onAddBtnClick = () =>{
        setShowAddModal(true);
    }

    return (
        <>
            <AddNewLiquorModal side={side} showAddModal={showAddModal} employee={employee} setShowAddModal={setShowAddModal} setFetchTableData={setFetchTableData}/>
            <Button onClick={onAddBtnClick} type="primary" className={styles.btn}>
                <div  className={styles.label}>Add New Liquor</div>
            </Button>
        </>
    )

}

export default AddNewLiquorBtn;