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
    // {loungeDrinks, pubDrinks}
) {
    const [side, setSide ] = useState('');
    const [showTable, setShowTable ] = useState(false);
    //changed to array instead of empty
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const setData = async () => {
            if (side == Sides.loungeSide){
         setTableData(loungeDrinks);
        } else if (side == Sides.pubSide){
            setTableData(pubDrinks);
        }
    }
        setData();
    }, [side]);

    return (
   <>
       <div className={styles.header}>
           <div>
               <SideSelector setSide={setSide} setShowTable={setShowTable}/>
           </div>
           {showTable ? (
           <>
               <div >
               <AddNewLiquorBtn side={side}/>
           </div>
           </>
       ) : (
           <></>
       )}
       </div>
       {showTable ? (
           <div className={styles.table}>
              <InventoryTable data={tableData} side={side} />
           </div>
       ) : (
           <></>
       )}

   </>
  );
}

// Index.getInitialProps = async () => {
//     const res = await fetch('http://localhost:3000/api/loungeDrinks' )
//     const loungeData  = await res.json()
//
//     const pubRes = await fetch('http://localhost:3000/api/pubDrinks');
//     const pubData = await pubRes.json();
//
//     return {loungeDrinks: loungeData.data, pubDrinks: pubData.data};
// }