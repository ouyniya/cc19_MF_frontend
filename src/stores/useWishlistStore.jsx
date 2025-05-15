import { create } from "zustand";
import axios from "axios";

const useWishlistStore = create((set) => ({
  wishlists: [],
  currentWishlist: null,
  getWishlists: async (token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res);
    set({ wishlists: res.data.wishlists });
  },
  addWishlist: async (token, body) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res);
  },
  setCurrentWishlist: (wishlist) => set({ currentWishlist: wishlist }),
  updateWishlist: async (wishlistId, token, body) => {
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/wishlist/${wishlistId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteWishlist: async (wishlistId, token) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/${wishlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
}));

export default useWishlistStore;
