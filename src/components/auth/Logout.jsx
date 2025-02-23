import React from 'react'
import { LogOut } from 'lucide-react';

function Logout() {
    
  return (
    <button className="btn text-white bg-[var(--blue)] hover:bg-[var(--blue)] border-[var(--blue)] hover:border-[var(--blue)] rounded-full">
        <LogOut />
        Logout
    </button>
  )
}

export default Logout