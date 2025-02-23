import React from 'react'
import { UserPen, HandCoins, Heart } from 'lucide-react';

function SidebarAdmin() {

  return (
    <>
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full shadow-xl transition-all duration-300 z-40 bg-[var(--blue)] border-[var(--blue)] text-white +active:text-pink-300 w-64 p-4"`}>
            <ul className="menu first-line:flex flex-col gap-0">
                <div className='h-[250px] bg-[var(--gray)] text-center text-white'>profile</div>
                <li className=''><a className='py-3 rounded-xl hover:bg-[var(--bluehover)] hover:text-blue-200 visited:bg-[var(--blue)] visited:text-white' href="#"><UserPen />Profile</a></li>
                <li className=''><a className='py-3 rounded-xl hover:bg-[var(--bluehover)] visited:bg-[var(--blue)] visited:text-white' href="#"><HandCoins />Investment<span className="badge badge-xs badge-accent"></span></a></li>
                <li className=''><a className='py-3 rounded-xl hover:bg-[var(--bluehover)] visited:bg-[var(--blue)] visited:text-white' href="#"><Heart />Wishlist</a></li>
            </ul>
        </div>
    </>
  )
}

export default SidebarAdmin