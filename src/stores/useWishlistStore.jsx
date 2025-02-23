import { create } from "zustand";

const useWishlistStore = create((set) => ({
  wishlists: [
    {
      id: 1,
      name: "1AMSET50",
      description:
        "กองทุนเปิด วรรณเอเอ็มเซ็ท 50 ชนิดไม่จ่ายเงินปันผลสำหรับผู้ลงทุนทั่วไป",
      note: "Note 1",
      rating: 3,
      group: "ตราสารทุน",
    },
    {
      id: 2,
      name: "KKPGNP",
      description:
        "กองทุนเปิด ภัทร global ... ชนิดไม่จ่ายเงินปันผลสำหรับผู้ลงทุนทั่วไป",
      note: "Note 2",
      rating: 4,
      group: "ตราสารทุนต่างประเทศ",
    },
    {
      id: 3,
      name: "ABD",
      description:
        "กองทุนเปิด ABD global ... ชนิดไม่จ่ายเงินปันผลสำหรับผู้ลงทุนทั่วไป",
      note: "Note 3",
      rating: 1,
      group: "ตราสารทุน",
    },
    {
      id: 4,
      name: "FIXED",
      description:
        "กองทุนเปิด FIXED global ... ชนิดไม่จ่ายเงินปันผลสำหรับผู้ลงทุนทั่วไป",
      note: "Note 4",
      rating: 5,
      group: "ตราสารทุนต่างประเทศ",
    },
  ],
  currentWishlist: null,
  setCurrentWishlist: (wishlist) => set({ currentWishlist: wishlist }),
  // updatePost: async (postId, token, body) => {
  //   const rs = await axios.put(`http://localhost:8899/${postId}`, body, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  // },
}));

export default useWishlistStore;
