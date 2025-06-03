import axios from "axios"; // ไลบรารีสำหรับการทำ HTTP requests (เช่น GET, POST, PUT) ไปยัง API
import { redirect } from "react-router";
import { create } from "zustand"; // ใช้สำหรับสร้าง store ที่เก็บสถานะต่างๆ ของแอปพลิเคชัน
import { createJSONStorage, persist } from "zustand/middleware";
import { createAlert } from "../utils/createAlert";
// createJSONStorage ใช้สำหรับสร้าง storage ที่สามารถเก็บข้อมูลในรูปแบบ JSON
// persist เป็น middleware ของ Zustand ที่ทำให้ข้อมูลใน store สามารถถูกเก็บใน localStorage (หรือ sessionStorage) และจะถูกโหลดกลับมาเมื่อผู้ใช้เปิดแอปใหม่

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      currentUser: null,
      login: async (input) => {
        // console.log(input)
        const rs = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/login`,
          input
        );
        // console.log(rs.data)
        set({ token: rs.data.token, user: rs.data.user });
        return rs.data;
      },
      getCurrentUser: async (token) => {
        if (get().user) {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          set({ currentUser: res.data });
          return res.data;
        } else {
          set({ currentUser: null });
        }
      },
      createNewAccount: async (input) => {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/register`,
          input
        );
      },
      updateUser: async (token, body) => {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      },
      deleteUser: async (token, body) => {
        const res = await axios.delete(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        set({ token: "", user: null, currentUser: null });
      },
      logout: async () => {
        set({ token: "", user: null, currentUser: null }, true); // บังคับเขียน state ที่ว่างลง storage
        localStorage.removeItem("state"); // ลบ localStorage ด้วย key ตรงๆ
        console.log("Logout: localStorage 'state' removed manually");
        
        
        // createAlert("success", "Logout successfully");
      },
    }),
    {
      name: "state", //ตั้งชื่อให้กับข้อมูลที่ถูกเก็บใน localStorage ซึ่งในที่นี้คือ "state"
      storage: createJSONStorage(() => localStorage), // กำหนดว่าให้ใช้ localStorage เป็นที่เก็บข้อมูล
    }
  )
);

export default useUserStore;
