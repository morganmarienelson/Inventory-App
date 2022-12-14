import React from 'react';
import 'antd/dist/antd.css';
import {DatePicker} from 'antd';
import styles from "../css/sideSelector.module.css"
import moment from "moment";

interface MonthSelectorProps{
    onSelectedDate : ( date:moment.Moment, dateString: string) => void;
}

const MonthSelector:React.FC<MonthSelectorProps> = ({ onSelectedDate}) => {

    return (
        <div className={styles.container}>
            <div className={styles.label}>Search by Month: </div>
            <DatePicker onChange={onSelectedDate} picker="month" />
        </div>
    );
}
export default MonthSelector;