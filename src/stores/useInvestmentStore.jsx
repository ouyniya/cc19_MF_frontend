import { create } from "zustand";
import axios from "axios";

const useInvestmentStore = create((set) => ({
  portfolio: [],
  currentPortfolio: null,
  getPortfolio: async (token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/ai/portfolio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    set({ portfolio: res.data.portfolio});
  },
  setCurrentPortfolio: (portfolio) => set({ currentPortfolio: portfolio }),
  addPortList: async (token, body) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/ai/portfolio`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updatePortList: async (id, token, body) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/ai/portfolio/${id}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  deletePortList: async (id, token) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/ai/portfolio/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  analyzePort: async (token, body) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/ai`, body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.analysis
  },
}));

export default useInvestmentStore;
