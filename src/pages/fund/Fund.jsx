import React from 'react'
import HowToChoose from '../../components/fund/HowToChoose'
import SearchBox from '../../components/fund/SearchBox'
import ResultTable from '../../components/fund/ResultTable'
import FilterFund from '../../components/fund/FilterFund'

function Fund() {
  return (
    <>
    <div className='m-auto p-9 max-w-7xl'>
        <h1 className='text-5xl font-bold text-center mb-[32px]'>เลือกกองทุนรวมที่ใช่</h1>
        <HowToChoose />
        <SearchBox />
        <FilterFund />
        <ResultTable />
    </div>
  
    </>
  )
}

export default Fund