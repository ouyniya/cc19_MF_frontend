import React, { useState } from 'react'
import { Outlet } from 'react-router';
import SidebarAdmin from '../components/admin/SidebarAdmin';

function LayoutAdmin() {

  return (
    <>    
    <div className="flex min-h-screen bg-base-200">
      <SidebarAdmin />
      <Outlet />
      {/* ใช้ Outlet เพื่อให้สามารถแสดงผลคอมโพเนนต์อื่นๆ ที่เข้ามาภายใน Layout นี้ได้ */}
     
    </div>
    </>
);
}

export default LayoutAdmin
