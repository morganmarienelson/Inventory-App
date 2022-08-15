import {Button} from "antd";
import {useState} from "react";
import AddNewLiquorModal from "./addNewLiquorModal";
import styles from "./css/addBtn.module.css";

const AddNewLiquorBtn = () =>{
    const [showAddModal, setShowAddModal] = useState(false)

    const onAddBtnClick = () =>{
        setShowAddModal(true);
    }

    return (
        <>
            <AddNewLiquorModal showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
        <Button onClick={onAddBtnClick} type="primary" className={styles.btn}>
            <div  className={styles.label}> Add New Liquor </div>
        </Button>
</>
    )

}

export default AddNewLiquorBtn;