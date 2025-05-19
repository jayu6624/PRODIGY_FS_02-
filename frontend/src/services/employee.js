import { api } from "./api";

const employeeApi = {
  createEmployee: async (employeeData) => {
    try {
      const response = await api.post("/employee", employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getAllEmployees: async () => {
    try {
      const response = await api.get("/employee");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/employee/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/employee/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default employeeApi;
