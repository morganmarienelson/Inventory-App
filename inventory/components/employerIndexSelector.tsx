import {Form, Select} from "antd";
import React from "react";
import {employeeData} from "../data/employeeData";
import styles from "./css/sideSelector.module.css"

interface EmployeeIndexSelectorProps{
    setEmployee: (employee: string) => void;
    setSelected: (boolean: true) => void;
}

const EmployeeIndexSelector: React.FC<EmployeeIndexSelectorProps> = ({ setEmployee, setSelected}) =>{
    const { Option } = Select;

    const employeeNames = [];
    for (let i = 0; i < employeeData.length; i++) {
        employeeNames.push(<Option key={employeeData[i].id} label={employeeData[i].name}>{employeeData[i].name}</Option>);
    }

    const onEmployeeChange = (value: string) => {
        setEmployee(value);
        setSelected(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.label}>Employee: </div>
            <Select
                style={{
                    width: 200,
                }}
                showSearch
                onChange={onEmployeeChange}
                optionFilterProp="children"
                placeholder="Select Name"
                filterOption={(input, option) =>  option.children.toString().toLowerCase().includes(input.toLowerCase())}
            >
                {employeeNames}
            </Select>
        </div>
    )


}

export default EmployeeIndexSelector;