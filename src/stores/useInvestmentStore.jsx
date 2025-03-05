import { create } from "zustand";
import axios from "axios";

const useInvestmentStore = create((set) => ({
  portfolio: [],
  currentPortfolio: null,
  getPortfolio: async (token) => {
    const res = await axios.get(`http://localhost:8000/ai/portfolio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res.data.portfolio)
    set({ portfolio: res.data.portfolio});
  },
  setCurrentPortfolio: (portfolio) => set({ currentPortfolio: portfolio }),
  addPortList: async (token, body) => {
    const res = await axios.post(`http://localhost:8000/ai/portfolio`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res);
  },
  updatePortList: async (id, token, body) => {
    const res = await axios.put(
      `http://localhost:8000/ai/portfolio/${id}`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  deletePortList: async (id, token) => {
    // console.log(typeof id)
    const res = await axios.delete(
      `http://localhost:8000/ai/portfolio/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  analyzePort: async (token, body) => {
    const res = await axios.post(
      `http://localhost:8000/ai`, body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data.analysis
  },
}));

export default useInvestmentStore;
