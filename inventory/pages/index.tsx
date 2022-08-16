import InventoryTable from "../components/inventoryTable";
import SideSelector from "../components/sideSelecter";
import {useState} from "react";
import AddNewLiquorBtn from "../components/addNewLiquourBtn";
import styles from "../styles/Home.module.css"
import {Drink} from "../types/drink"
import { useEffect } from "react";
import { Sides } from "../enums/side";

const Index = ({ drinks }) => {
    const [side, setSide ] = useState('');
    const [showTable, setShowTable ] = useState(false);
    const [tableData, setTableData] = useState(Array<Drink>());
    const [pubData, setPubData] = useState(Array<Drink>());
    const [loungeData, setLoungeData] = useState(Array<Drink>());

    useEffect(() => {
        const getData = () => {
            {drinks.map(drink => {
                const pubDrink = {
                 vendor: drink.brand,
                 name: drink.name,
                 quantity: drink.pubQuantity
                } 
                pubData.push(pubDrink);
                const loungeDrink = {
                 vendor: drink.brand,
                 name: drink.name,
                 quantity: drink.loungeQuantity
                } 
                loungeData.push(loungeDrink);
             })
        }
        getData();
    }, [])

    useEffect(() => {
        const setData = () => {
            if (side == Sides.pubSide){
                setTableData(drinks);
            } else if (side == Sides.loungeSide){
                setTableData(drinks)
            }
        }
        setData();
    }, [side])

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
    const res = await fetch("http://localhost:3000/api/drinks");
    const {data} = await res.json();

    return { drinks: data }

}
