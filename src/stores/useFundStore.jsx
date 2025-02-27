import { create } from "zustand";
import axios from "axios";

const useWishlistStore = create((set) => ({
  fundNames: [],
  getFundNames: async (classAbbrName) => {
    const res = await axios.get(`http://localhost:8000/funds/all-fund-names?classAbbrName=${classAbbrName}`);
    // console.log('getFundNames...',res);
    set({ fundNames: res.data });
  },
}));

export default useWishlistStore;
