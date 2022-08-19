import React from 'react';
import 'antd/dist/antd.css';
import {DatePicker} from 'antd';
import styles from "../css/sideSelector.module.css"
import moment from "moment";

interface DaySelectorProps{
    onSelectedDate : ( date:moment.Moment, dateString: string) => void;
}

const DaySelector:React.FC<DaySelectorProps> = ({ onSelectedDate}) => {

    return (
        <div className={styles.container}>
            <div className={styles.label}>Search by Date: </div>
            <DatePicker onChange={onSelectedDate}  />

        </div>
    );
}
export default DaySelector;