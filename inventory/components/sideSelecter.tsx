import React from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import styles from "./css/sideSelector.module.css"

interface SideSelectorProps{
    setSide: (side: string) => void
    setShowTable: (showTable: boolean) => void;
}

const SideSelector:React.FC<SideSelectorProps> = ({setSide, setShowTable}) => {
    const { Option } = Select;

    const handleChange = (value) => {
        setSide(value)
        setShowTable(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>Side: </div>
            <Select
                placeholder="Select Side"
                style={{
                    width: 120,
                }}
                onChange={handleChange}
            >
                <Option value="pub">Pub Side</Option>
                <Option value="lounge">Lounge Side</Option>
            </Select>
        </div>
    );
}
export default SideSelector;