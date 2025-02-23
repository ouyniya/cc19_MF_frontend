import React, { useState } from 'react'
import { Outlet } from 'react-router';
import SidebarAdmin from '../components/admin/SidebarAdmin';

function LayoutAdmin() {

  return (
    <>    
    <div className="flex min-h-screen bg-base-200">
      <SidebarAdmin />
      <Outlet />
    </div>
    </>
);
}

export default LayoutAdmin
