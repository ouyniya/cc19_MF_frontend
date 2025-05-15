import React from 'react'
import { Outlet } from 'react-router'
import SidebarUser from '../components/user/SidebarUser';

function LayoutUser() {
  return (
    <>
        <div className="flex flex-col lg:flex-row p-0 bg-base-200">
            <SidebarUser />
            <Outlet />
        </div>
    </>
  )
}

export default LayoutUser