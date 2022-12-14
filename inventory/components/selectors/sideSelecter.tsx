import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import styles from "../css/sideSelector.module.css"
import {Sides} from "../../enums/side";

interface SideSelectorProps{
    setSide: (side: string) => void
    setSelected: (showTable: boolean) => void;
    setFetchTableData : (fetchTableData: boolean) => void;
}

const SideSelector:React.FC<SideSelectorProps> = ({setSide, setSelected, setFetchTableData}) => {
    const { Option } = Select;

    const handleChange = (value: string) => {
        setSide(value)
        setSelected(true);
        setFetchTableData(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>Side: </div>
            <Select
                placeholder="Select Side"
                style={{
                    width: 200,
                }}
                onChange={handleChange}
            >
                <Option value={Sides.pubSide}>{Sides.pubSide}</Option>
                <Option value={Sides.loungeSide}>{Sides.loungeSide}</Option>
            </Select>
        </div>
    );
}
export default SideSelector;