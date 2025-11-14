import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, DatePicker, Select } from 'antd';
import { toast } from "react-toastify";
import {createEmployee, updateEmployee} from "../service/employeesService";
import moment from 'moment';
const EmployeeModal = ({ isOpen, onClose, employee, onSuccess }) => {
    
    const onFinish = values => {
        if (employee) {
    form.validateFields().then(() => {
                const formattedValues = {
                    ...values,
                    dob: values.dob.format('YYYY-MM-DD'),
                };
                updateEmployee(employee.id, formattedValues).then(() => {
                toast.success("Cập nhật thành công", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                onClose();
                form.resetFields();
                if (onSuccess) {
                    onSuccess();
                }
        });
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
        }else {
            form.validateFields().then(() => {
            const formattedValues = {
                ...values,
                dob: values.dob.format('YYYY-MM-DD'),
            };
            createEmployee(formattedValues).then(() => {
                toast.success("Thêm mới thành công", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                onClose();
                form.resetFields();
                if (onSuccess) {
                    onSuccess();
                }
        });
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
        }
     
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const [form] = Form.useForm();

        useEffect(() => {
        if (employee) {
            form.setFieldsValue({
                ...employee,
                dob: employee.dob ? moment(employee.dob, 'YYYY-MM-DD') : null,
            });
        } else {
            form.resetFields();
        }
    }, [employee, form]); 

    return (
        <Modal
            title={`${employee ? 'Edit Employee' : 'Add Employee'}`}
            open={isOpen}
            onCancel={onClose}
            footer={false}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
                form={form}

            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    name="dob"
                    rules={[
                        { required: true, message: 'Please input your date of birth!' },
                        {
                            validator: (_, value) => {
                                if (!value || value.isBefore(moment(), 'day') || value.isSame(moment(), 'day')) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Date of birth cannot be greater than today!'));
                            }
                        }
                    ]}
                >
                    <DatePicker disabledDate={(current) => current && current > moment().endOf('day')} />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please select your gender!' }]}
                >
                    <Select>
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EmployeeModal