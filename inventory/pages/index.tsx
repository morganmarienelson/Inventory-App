import InventoryTable from "../components/inventoryTable";
import SideSelector from "../components/sideSelecter";
import {useState} from "react";
import AddNewLiquorBtn from "../components/addNewLiquorBtn";
import styles from "../styles/Home.module.css"
import { useEffect } from "react";
import { Sides } from "../enums/side";
import {loungeDrinks} from "../data/loungeDrinks";
import {pubDrinks} from "../data/pubDrinks";
import EmployeeIndexSelector from "../components/employerIndexSelector";

export default function Index(
) {
    const [side, setSide ] = useState('');
    const [employee, setEmployee ] = useState('');
    const [fetchTableData, setFetchTableData ] = useState(true);
    const [sideSelected, setSideSelected] = useState(false);
    const [employeeSelected, setEmployeeSelected ] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const setData = async () => {
            if (fetchTableData) {
                if (side == Sides.loungeSide) {
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
                } else if (side == Sides.pubSide) {
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
            }
            setFetchTableData(false);
    }
        setData();
    }, [fetchTableData]);

    return (
   <>
       <div className={styles.header}>
           <div className={styles.selectors}>
               <EmployeeIndexSelector setEmployee={setEmployee} setSelected={setEmployeeSelected}/>
               <SideSelector setSide={setSide} setSelected={setSideSelected} setFetchTableData={setFetchTableData}/>
           </div>
           {sideSelected && employeeSelected ? (
           <>
               <div >
               <AddNewLiquorBtn side={side} setFetchTableData={setFetchTableData} employee={employee}/>
           </div>
           </>
       ) : (
           <></>
       )}
       </div>
       {sideSelected && employeeSelected ? (
           <div className={styles.table}>
              <InventoryTable employee={employee} data={tableData} side={side} setFetchTableData={setFetchTableData}/>
           </div>
       ) : (
           <></>
       )}

   </>
  );
}