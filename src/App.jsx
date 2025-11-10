import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd';
import { getAllEmployees, deleteEmployee } from './service/employeesService'
import EmployeeModal from './components/EmployeeModal';
import { ToastContainer ,toast } from "react-toastify";

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllEmployees();
      setEmployees(result);
    };
    fetchData();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSuccess = async () => {
    const result = await getAllEmployees();
    setEmployees(result);
  };

  const handleSort = (key) => {
    const sorted = [...employees].sort((a, b) => a[key].localeCompare(b[key]));
    setEmployees(sorted);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    showModal();
  };

  const handleDelete = (employeeId) => {
    deleteEmployee(employeeId).then(async () => {
      const result = await getAllEmployees();
      setEmployees(result);
      toast.success("Xóa nhân viên thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, employee) => (
        <>
          <Button onClick={() => handleEdit(employee)} className='me-3' type="primary" >Edit</Button>
          <Button onClick={() => handleDelete(employee.id)} type="primary" danger>Delete</Button>
        </>
      ),
    }
  ];
  return (
    <>
      <div className='container'>
        <h1 className='mb-3'>Employee Management</h1>
        <div className='d-flex justify-content-between'>
          <div>
            <Button className='me-3' onClick={() => handleSort("name")}>Sort by Name</Button>
            <Button onClick={() => handleSort("address")}>Sort by Address</Button>
          </div>
          <Button type="primary" onClick={showModal}>Add Employee</Button>
        </div>
        <Table className='mt-3' dataSource={employees} columns={columns} />
      </div>
      <EmployeeModal isOpen={isModalOpen} onClose={handleCancel} employee={selectedEmployee} onSuccess={handleSuccess} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
