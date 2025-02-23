import React from 'react'
import { LogoIcon } from '../icons'

function Footer() {
  return (
    <>

    <footer className="footer p-10 mt-[100px] w-full md:h-[400px] bg-[var(--blue)] text-white">
        <div className='md:flex m-auto gap-[100px]'>
        <aside className='flex flex-col basis-1/4'>
            <LogoIcon className='w-[100px]' />
            <p className='text-xl mt-2'>
            <strong>MyWishFund</strong>
            </p>
            <p>
            Making fund selection smarter, one wishlist at a time.
            </p>
        </aside>
            <nav className='flex flex-col basis-1/4'>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav className='flex flex-col basis-1/4'>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
            <section className='flex flex-col basis-1/4'>
                <h6 className="footer-title">ค้นหากองทุน</h6>
                <div className="join">
                    <input
                    type="text"
                    placeholder="ใส่ชื่อกองทุนที่นี่"
                    className="input input-bordered join-item text-gray-700 dark:text-gray-200" />
                    <button className="btn bg-[var(--green)] border-[var(--green)] hover:bg-[var(--darkgreen)] hover:border-[var(--darkgreen)] text-gray-800 join-item">ค้นหา</button>
                </div>
            </section>   
        </div>
    
    </footer>



    </>
  )
}

export default Footer