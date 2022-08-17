import {Form, Select} from "antd";
import React from "react";
import {employeeData} from "../data/employeeData";

interface EmployeeSelectorProps{
    onEmployeeChange : (e: string) => void;
}


const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({onEmployeeChange}) =>{
    const { Option } = Select;

    const employeeNames = [];
    for (let i = 0; i < employeeData.length; i++) {
        employeeNames.push(<Option key={employeeData[i].id} label={employeeData[i].name}>{employeeData[i].name}</Option>);
    }

    return (
        <Form.Item
            style={{
                width: 250,
            }} label="Employee" name="employee"  rules={[

            {
                required: true,
            },
        ]} >
            <Select
                showSearch
                onChange={onEmployeeChange}
                optionFilterProp="children"
                placeholder="Select a person"
                filterOption={(input, option) =>  option.children.toString().toLowerCase().includes(input.toLowerCase())}
            >
                {employeeNames}
            </Select>
        </Form.Item>
    )


}

export default EmployeeSelector;