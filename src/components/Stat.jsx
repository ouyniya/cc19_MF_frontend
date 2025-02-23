import React from 'react'

function Stat() {
  return (
    <>
        <div className="stats w-full block md:flex mb-[80px]">
            <div className="stat place-items-center">
                <div className="stat-title text-xl">Downloads</div>
                <div className="stat-value text-[var(--blue)] text-5xl">31K</div>
                <div className="stat-desc text-md">From January 1st to February 1st</div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title text-xl">Users</div>
                <div className="stat-value text-[var(--pink)] text-5xl">4,200</div>
                <div className="stat-desc last:text-md">↗︎ 40 (2%)</div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title text-xl">New Registers</div>
                <div className="stat-value text-[var(--green)] text-5xl">1,200</div>
                <div className="stat-desc text-md">↘︎ 90 (14%)</div>
            </div>

            <div className="stat place-items-center">
                <div className="stat-title text-xl">Page views</div>
                <div className="stat-value text-[var(--yellow)] text-5xl">2,000</div>
                <div className="stat-desc text-md">↘︎ 90 (14%)</div>
            </div>
        </div>
    </>
  )
}

export default Stat