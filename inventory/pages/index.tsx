import InventoryTable from "../components/inventoryTable";
import SideSelector from "../components/sideSelecter";
import {useState} from "react";
import AddNewLiquorBtn from "../components/addNewLiquorBtn";
import styles from "../styles/Home.module.css"
import { useEffect } from "react";
import { Sides } from "../enums/side";
import {loungeDrinks} from "../data/loungeDrinks";
import {pubDrinks} from "../data/pubDrinks";
import {Drink} from "../types/drink";
import {message} from "antd";

export default function Index(
) {
    const [side, setSide ] = useState('');
    const [fetchTableData, setFetchTableData ] = useState(false);
    const [showTable, setShowTable ] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const setData = async () => {
            if (fetchTableData) {
            if (side == Sides.loungeSide){
                    // try{
                    // const res = await fetch('http://localhost:3000/api/loungeDrinks' )
                    // const loungeData  = await res.json()
                    // if (res.ok){
                    // setTableData(loungeData.data);
                    // } else {
                    //     message.error("Error retrieving Lounge Side data");
                    // }
                    // } catch (error) {
                    //     console.log(error);
                    //     message.error("Error retrieving Lounge Side data");
                    // }
                    setTableData(loungeDrinks);
        } else if (side == Sides.pubSide){
                // try{
                // const res = await fetch('http://localhost:3000/api/pubDrinks' )
                // const pubData  = await res.json()
                // if (res.ok){
                // setTableData(pubData.data);
                // } else {
                //     message.error("Error retrieving Pub Side data");
                // }
                // } catch (error) {
                //     console.log(error);
                //     message.error("Error retrieving Pub Side data");
                // }
                setTableData(pubDrinks);
            }
            setFetchTableData(false);
            }
    }
        setData();
    }, [fetchTableData, []]);

    return (
   <>
       <div className={styles.header}>
           <div>
               <SideSelector setSide={setSide} setShowTable={setShowTable}/>
           </div>
           {showTable ? (
           <>
               <div >
               <AddNewLiquorBtn side={side} setFetchTableData={setFetchTableData}/>
           </div>
           </>
       ) : (
           <></>
       )}
       </div>
       {showTable ? (
           <div className={styles.table}>
              <InventoryTable data={tableData} side={side} setFetchTableData={setFetchTableData}/>
           </div>
       ) : (
           <></>
       )}

   </>
  );
}