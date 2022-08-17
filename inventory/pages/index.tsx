import InventoryTable from "../components/inventoryTable";
import SideSelector from "../components/sideSelecter";
import {useState} from "react";
import AddNewLiquorBtn from "../components/addNewLiquorBtn";
import styles from "../styles/Home.module.css"
import { useEffect } from "react";
import { Sides } from "../enums/side";
import {loungeDrinks} from "../data/loungeDrinks";
import {pubDrinks} from "../data/pubDrinks";

export default function Index(
) {
    const [side, setSide ] = useState('');
    const [showTable, setShowTable ] = useState(false);
    const [tableData, setTableData] = useState();
    const [editingRecord, setEditingRecord] = useState({
        _id: '',
        vendor: '',
        name: '',
        quantity: 0,
    }
    );

    useEffect(() => {
        const setData = async () => {
            if (side == Sides.loungeSide){
                const res = await fetch('http://localhost:3000/api/loungeDrinks' )
                const loungeData  = await res.json()
         setTableData(loungeData.data);
        } else if (side == Sides.pubSide){
            const pubRes = await fetch('http://localhost:3000/api/pubDrinks');
            const pubData = await pubRes.json();
            setTableData(pubData.data);
        }
    }
        setData();
    }, [side, editingRecord]);

    return (
   <>
       <div className={styles.header}>
           <div>
               <SideSelector setSide={setSide} setShowTable={setShowTable}/>
           </div>
           {showTable ? (
           <>
               <div >
               <AddNewLiquorBtn side={side} setEditingRecord={setEditingRecord}/>
           </div>
           </>
       ) : (
           <></>
       )}
       </div>
       {showTable ? (
           <div className={styles.table}>
              <InventoryTable data={tableData} editingRecord={editingRecord} setEditingRecord={setEditingRecord} side={side}/>
           </div>
       ) : (
           <></>
       )}

   </>
  );
}