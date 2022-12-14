import InventoryTable from "../components/inventoryTable";
import SideSelector from "../components/selectors/sideSelecter";
import {useState} from "react";
import AddNewLiquorBtn from "../components/addNewLiquorBtn";
import styles from "../styles/Home.module.css"
import { useEffect } from "react";
import { Sides } from "../enums/side";
import {loungeDrinksInventory} from "../data/loungeDrinksInventory";
import {pubDrinksInventory} from "../data/pubDrinksInventory";
import EmployeeSelector from "../components/selectors/employeeSelector";
import {PubDrinkNames} from "../data/pubDrinksNames";
import {LoungeDrinkNames} from "../data/loungeDrinkNames";

export default function Index(
) {
    const [side, setSide ] = useState('');
    const [employee, setEmployee ] = useState('');
    const [fetchTableData, setFetchTableData ] = useState(true);
    const [sideSelected, setSideSelected] = useState(false);
    const [employeeSelected, setEmployeeSelected ] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [liqNameFilters, setLiqNameFilters ] = useState([]);

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
                    setTableData(loungeDrinksInventory);
                    LoungeDrinkNames.forEach(function (name) {
                        const liquorNameFilter = {
                            text: `${name.liquorName}`,
                            value: `${name.liquorName}`,
                        }
                        liqNameFilters.push(liquorNameFilter)
                    });
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
                    setTableData(pubDrinksInventory);
                    PubDrinkNames.forEach(function (name) {
                        const liquorNameFilter = {
                            text: `${name.liquorName}`,
                            value: `${name.liquorName}`,
                        }
                        liqNameFilters.push(liquorNameFilter)
                    });
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
               <EmployeeSelector setEmployee={setEmployee} setSelected={setEmployeeSelected}/>
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
              <InventoryTable employee={employee} data={tableData} liqNameFilters={liqNameFilters} side={side} setFetchTableData={setFetchTableData}/>
           </div>
       ) : (
           <></>
       )}

   </>
  );
}