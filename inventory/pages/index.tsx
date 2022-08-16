import InventoryTable from "../components/inventoryTable";
import SideSelector from "../components/sideSelecter";
import {useState} from "react";
import AddNewLiquorBtn from "../components/addNewLiquourBtn";
import styles from "../styles/Home.module.css"
import {Drink} from "../types/drink"
import { useEffect } from "react";
import { Sides } from "../enums/side";

const Index = ({ loungeDrinks, pubDrinks }) => {
    const [side, setSide ] = useState('');
    const [showTable, setShowTable ] = useState(false);
    const [tableData, setTableData] = useState(Array<Drink>());

    useEffect(() => {
        const setData = () => {
            if (side == Sides.pubSide){
                setTableData(loungeDrinks);
            } else if (side == Sides.loungeSide){
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
           <div >
               <AddNewLiquorBtn/>
           </div>
       </div>
       {showTable ? (
           <>
              <InventoryTable data={tableData}  />
           </>
       ) : (
           <></>
       )}

   </>
  );
}

export default Index;

Index.getInitialProps = async () => {
    const loungeRes = await fetch("http://localhost:3000/api/loungeDrinks");
    const {loungeData} = await loungeRes.json();

    const pubRec = await fetch("http://localhost:3000/api/pubDrinks");
    const {pubData} = await pubRec.json();

    return { loungeDrinks: loungeData, pubDrinks: pubData }

}
