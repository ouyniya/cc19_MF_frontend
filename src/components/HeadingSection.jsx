import React from 'react'

function HeadingSection(props) {
    const { text } = props

  return (
    <>
        <div className='flex flex-col m-auto mt-[84px] mb-[24px] w-4/5'>
            <p className='text-center text-3xl font-bold text-[var(--blue)]'>
                {text}
            </p>
        </div>
    </>
    
  )
}

export default HeadingSection