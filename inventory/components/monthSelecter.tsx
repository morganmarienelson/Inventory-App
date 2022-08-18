import React from 'react';
import 'antd/dist/antd.css';
import {DatePicker} from 'antd';
import styles from "./css/sideSelector.module.css"
import moment from "moment";
import {InventoryLogType} from "../types/inventoryLogType";
import {InventoryLogData} from "../data/inventoryLogData";
import {Sides} from "../enums/side";
import {PubSideUserLog} from "../data/pubSideUserLog";
import {LoungeSideUserLog} from "../data/loungeSideUserLog";

interface MonthSelectorProps{
    setTableData : (tableData: any) => void;
    side: string;
}

const MonthSelector:React.FC<MonthSelectorProps> = ({ setTableData, side}) => {


    const onSelectedMonth = (date:moment.Moment, dateString: string) => {
        if (dateString != null){
            let tempArray = [];
            setTableData(tempArray)
            let i = 0
            if (side == Sides.pubSide){
                PubSideUserLog.forEach(function (data) {
                    if (data.date.includes(dateString)){
                        tempArray[i] = data;
                        i++;
                    }
                });
            } else if (side == Sides.loungeSide){
                LoungeSideUserLog.forEach(function (data) {
                    if (data.date.includes(dateString)){
                        tempArray[i] = data;
                        i++;
                    }
                });
            }
            setTableData(tempArray);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>Search by Month: </div>
            <DatePicker onChange={onSelectedMonth} picker="month" />

        </div>
    );
}
export default MonthSelector;