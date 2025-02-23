import React from 'react'
import { NextIcon } from '../icons'

function AssetBoxes(props) {
    const { text, beginColor, endingColor, style, ...restProps } = props

  return (
    <>
        <div className={`relative m-auto my-[24px] flex flex-col justify-between xl:basis-1/4 sm:w-[270px] w-full min-w-[270px] h-[210px] rounded-2xl`} style={style}>
            <div className='flex flex-col basis-3/4 px-[36px] py-[36px]'>
                <p className='leading-9 text-xl font-light text-white'>กองทุนรวม</p>
                <p className='text-2xl font-bold text-white'>{text}</p>
            </div>
            <div className='absolute flex gap-2 bottom-[16px] right-[24px]'>
                <p className='text-md font-light text-white'>เลือกกองทุน</p>
                <NextIcon className='w-[18px]' />
            </div>
            <div className='w-full h-[50px] from-white bg-gradient-to-b opacity-15'></div>
        </div>
    </>
  )
}

export default AssetBoxes