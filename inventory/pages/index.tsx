import InventoryTable from "../components/inventoryTable";
import SideSelector from "../components/sideSelecter";
import {useState} from "react";
import AddNewLiquorBtn from "../components/addNewLiquourBtn";
import styles from "../styles/Home.module.css"

const Home = () => {
    const [side, setSide ] = useState('');
    const [showTable, setShowTable ] = useState(false);


    return (
   <>
       <div className={styles.header}>
           <div>
               <SideSelector setSide={setSide} setShowTable={setShowTable}/>
           </div>
           <div>
               <AddNewLiquorBtn/>
           </div>
       </div>
       {showTable ? (
           <>
              <InventoryTable side={side}/>
           </>
       ) : (
           <></>
       )}

   </>
  );
}

export default Home;
