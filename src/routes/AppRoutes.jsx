import React from "react"; // ใช้ในการสร้าง components
import { Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import Home from "../pages/main/Home";
import ContactUs from "../pages/main/ContactUs";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Fund from "../pages/fund/Fund";
import RiskAssessment from "../pages/riskAssessment/RiskAssessment";
import NotFound from "../pages/main/NotFound";
import AdminProfile from "../pages/admin/AdminProfile";
// import Analytics from "../pages/admin/Analytics";
import UserManagement from "../pages/admin/UserManagement";
import UserProfile from "../pages/user/UserProfile";
import Investments from "../pages/user/Investments";
import Wishlist from "../pages/user/Wishlist";
import LayoutUser from "../layouts/LayoutUser";
import LayoutAdmin from "../layouts/LayoutAdmin";
import ProtectRoutes from "./ProtectRoutes";
import RiskResult from "../pages/riskAssessment/RiskResult";
import ProtectAuth from "./ProtectAuth";

// Route ใช้ในการกำหนดเส้นทาง (route) เฉพาะหนึ่งเส้นทาง
// Routes จะตรวจสอบว่า URL ตรงกับ path ไหน และแสดงคอมโพเนนต์ที่ตรงกับเส้นทางนั้น
// {/* Layout เป็นเหมือนแม่แบบ (template) ที่สามารถแสดงผลได้หลายหน้าภายใน Layout เดียวกัน */}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="register" element={<ProtectAuth el={<Register />} />} />
          <Route path="login" element={<ProtectAuth el={<Login />} />} />
          <Route path="fund" element={<Fund />} />
          <Route path="risk-assessment" element={<RiskAssessment />} />
          <Route path="risk-assessment-result" element={<RiskResult />} />
        </Route>

        {/* Private: user */}
        <Route
          path="user"
          element={<ProtectRoutes el={<LayoutUser />} allows={["USER"]} />}
        >
          <Route index element={<UserProfile />} />
          <Route path="investment" element={<Investments />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        {/* Private: Admin */}
        <Route
          path="admin"
          element={<ProtectRoutes el={<LayoutAdmin />} allows={["ADMIN"]} />}
        >
          <Route index element={<AdminProfile />} />
          <Route path="manage" element={<UserManagement />} />
          {/* <Route path="analytics" element={<Analytics />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
