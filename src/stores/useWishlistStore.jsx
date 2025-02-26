import { create } from "zustand";
import axios from "axios";

const useWishlistStore = create((set) => ({
  wishlists: [],
  currentWishlist: null,
  getWishlists: async (token) => {
    const rs = await axios.get(`http://localhost:8000/wishlist`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    set({ wishlist: rs.data.wishlists })
  },
  setCurrentWishlist: (wishlist) => set({ currentWishlist: wishlist }),
  // updatePost: async (postId, token, body) => {
  //   const rs = await axios.put(`http://localhost:8899/${postId}`, body, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  // },
}));

export default useWishlistStore;
