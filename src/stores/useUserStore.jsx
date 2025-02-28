import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      currentUser: null,
      login: async (input) => {
        // console.log(input)
        const rs = await axios.post("http://localhost:8000/api/login", input);
        // console.log(rs.data)
        set({ token: rs.data.token, user: rs.data.user });
        return rs.data;
      },
      getCurrentUser: async (token) => {
        const res = await axios.get("http://localhost:8000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ currentUser: res.data });
        return res.data;
      },
      createNewAccount: async (input) => {
        const res = await axios.post(
          "http://localhost:8000/api/register",
          input
        );
      },
      updateUser: async (token, body) => {
        const res = await axios.put(
          "http://localhost:8000/user/profile",
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      },
      logout: () => set({ token: "", user: null, currentUser: null }),
    }),
    {
      name: "state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
