import { create } from "zustand";
import axios from "axios";

const useWishlistStore = create((set) => ({
  fundNames: [],
  filteredFunds: [],
  company: [],
  group: [],
  riskLevel: [],
  globalInv: [],
  getFundNames: async (classAbbrName) => {
    const res = await axios.get(
      `http://localhost:8000/funds/all-fund-names?classAbbrName=${classAbbrName}`
    );
    // console.log('getFundNames...',res);
    set({ fundNames: res.data });
  },
  getCompanies: async () => {
    const res = await axios.get(`http://localhost:8000/funds/all-company`);
    // console.log('getFundNames...',res);
    set({ company: res.data });
  },
  getGroup: async () => {
    const res = await axios.get(`http://localhost:8000/funds/all-group`);
    // console.log('getFundNames...',res);
    set({ group: res.data });
  },
  getRiskLevel: async () => {
    const res = await axios.get(`http://localhost:8000/funds/all-risk-level`);
    // console.log('getFundNames...',res);
    set({ riskLevel: res.data });
  },
  getGlobalInv: async () => {
    const res = await axios.get(`http://localhost:8000/funds/all-global-inv`);
    // console.log('getFundNames...',res);
    set({ globalInv: res.data });
  },
  getFilteredFunds: async (
    classAbbrName,
    companyId,
    fundCompareGroup,
    fundRiskLevelId,
    investCountryFlag,
    dividendPolicy,
    page,
    limit
  ) => {
    const res = await axios.get(
      `http://localhost:8000/funds/filter?classAbbrName=${classAbbrName}&companyId=${companyId}&fundCompareGroup=${fundCompareGroup}&fundRiskLevelId=${fundRiskLevelId}&investCountryFlag=${investCountryFlag}&dividendPolicy=${dividendPolicy}&page=${page}&limit=${limit}`
    );
    // console.log('url...',url);
    set({ filteredFunds: res.data });
  },
}));

export default useWishlistStore;
