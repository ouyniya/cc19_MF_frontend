import { create } from "zustand";
import axios from "axios";

const useAdminStore = create((set) => ({
  allUsers: [],
  currentUserManage: null,
  getAllUsers: async (token) => {
    const res = await axios.get(`http://localhost:8000/admin/user-management`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ allUsers: res.data });
  },
  addUser: async (token, body) => {
    const res = await axios.post(`http://localhost:8000/admin/user-management`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res);
  },
  setCurrentUserManage: (user) => set({ currentUserManage: user }),
  updateUser: async (token, body) => {
    const res = await axios.put(`http://localhost:8000/admin/user-management`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteUser: async (userId, token) => {
    const res = await axios.delete(`http://localhost:8000/admin/user-management/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
}));

export default useAdminStore;
