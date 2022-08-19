import {Select} from "antd";
import React from "react";
import {EmployeeNames} from "../../data/employeeNames";
import styles from "../css/sideSelector.module.css"

interface EmployeeSelectorProps{
    setEmployee: (employee: string) => void;
    setSelected: (selected: boolean) => void;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({ setEmployee, setSelected}) =>{
    const { Option } = Select;

    const employeeNames = [];
    for (let i = 0; i < EmployeeNames.length; i++) {
        employeeNames.push(<Option key={EmployeeNames[i].id} label={EmployeeNames[i].liquorName}>{EmployeeNames[i].liquorName}</Option>);
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

export default EmployeeSelector;