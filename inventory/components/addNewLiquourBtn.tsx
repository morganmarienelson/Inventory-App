import {Button} from "antd";
import {useState} from "react";
import AddNewLiquorModal from "./addNewLiquorModal";
import styles from "./css/addBtn.module.css";

interface AddNewLiquorBtnProps{
    side: string;
}

const AddNewLiquorBtn: React.FC<AddNewLiquorBtnProps> = ({side}) =>{
    const [showAddModal, setShowAddModal] = useState(false)

    const onAddBtnClick = () =>{
        setShowAddModal(true);
    }

    return (
        <>
            <AddNewLiquorModal side={side} showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
        <Button onClick={onAddBtnClick} type="primary" className={styles.btn}>
            <div  className={styles.label}> Add New Liquor </div>
        </Button>
</>
    )

}

export default AddNewLiquorBtn;