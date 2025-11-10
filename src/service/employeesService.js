import axios from "./axios";

const getAllEmployees = () => {
  return axios.get("/employees");
};

const createEmployee = (data) => {
    return axios.post("/employees", data);
};

const updateEmployee = (id, data) => {
    return axios.put(`/employees/${id}`, data);
};

const deleteEmployee = (id) => {
    return axios.delete(`/employees/${id}`);
};

const getEmployeeById = (id) => {
    return axios.get(`/employees/${id}`);
};

export { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById };