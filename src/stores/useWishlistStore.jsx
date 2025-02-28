import { create } from "zustand";
import axios from "axios";

const useWishlistStore = create((set) => ({
  wishlists: [],
  currentWishlist: null,
  getWishlists: async (token) => {
    const res = await axios.get(`http://localhost:8000/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res);
    set({ wishlists: res.data.wishlists });
  },
  addWishlist: async (token, body) => {
    const res = await axios.post(`http://localhost:8000/wishlist`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(res);
  },
  setCurrentWishlist: (wishlist) => set({ currentWishlist: wishlist }),
  updateWishlist: async (wishlistId, token, body) => {
    const res = await axios.put(`http://localhost:8000/wishlist/${wishlistId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  deleteWishlist: async (wishlistId, token) => {
    const res = await axios.delete(`http://localhost:8000/wishlist/${wishlistId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
}));

export default useWishlistStore;
