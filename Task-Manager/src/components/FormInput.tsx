import React from "react";
import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";
import { InputProps } from "antd/lib/input";

interface FormInputProps {
  name: string;
  label: string;
  rules: Rule[];
  inputProps: InputProps;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  rules,
  inputProps,
}) => (
  <Form.Item label={label} name={name} rules={rules}>
    <Input {...inputProps} />
  </Form.Item>
);

export default FormInput;
