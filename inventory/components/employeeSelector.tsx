import {Form, Select} from "antd";
import React from "react";
import {Drink} from "../types/drink";
import {employeeData} from "../data/employeeData";

interface EmployeeSelectorProps{
    onEmployeeChange : (e) => void;
}


const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({onEmployeeChange}) =>{
    const { Option } = Select;

    const employeeNames = [];
    for (let i = 0; i < employeeData.length; i++) {
        employeeNames.push(<Option key={employeeData[i].id.toString(36)}>{employeeData[i].name.toString()}</Option>);
    }

    return (
        <Form.Item name="Employee"
                   style={{
                       width: 250,
                   }}
                   rules={[{
                       required: true,
                   }]}  >
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