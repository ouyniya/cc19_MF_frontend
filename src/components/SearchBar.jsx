import React from 'react'

function SearchBar() {
  return (
    <>
        <div className='m-auto w-full px-[21px]'>
            <div className='xl:px-[84px] md:flex justify-between gap-3 px-[24px] py-[36px] w-full bg-slate-200 dark:bg-base-200 rounded-2xl'>
                <div className='md:flex lg:w-auto w-[200px]'>
                    <p className='xl:text-2xl text-xl font-medium'>ค้นหาจากชื่อกองทุน</p>
                </div>
                <div className='md:flex md:basis-3/5 mt-[12px]'>
                    <input type="text" className='input md:input-lg w-full rounded-full' placeholder='ใส่ชื่อกองทุนที่นี่'/>
                </div>
                <div className='flex flex-1/5 md:items-center md:justify-center mt-[12px]'>
                    <button className='btn md:btn-lg w-full bg-[var(--blue)] hover:bg-[var(--blue)] border-[var(--blue)] text-white rounded-full md:px-[48px] md-[24px] py-[8px]'>ค้นหา</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default SearchBar