import { FfsIcon } from "../icons";

function FundHot({ funds }) {
    
  return (
    <>
            <div className='lg:flex py-[48px] px-[24px] w-full gap-5'>
                <div className="lg:basis-1/2 bg-gray-200 mb-[24px] lg:mb-[0px]">pic</div>

                <div className='relative flex flex-col justify-between h-auto w-full rounded-2xl lg:basis-1/2'>
                    <p className='text-center text-xl font-bold mb-[12px]'>กองทุนที่สมาชิกบันทึกเข้า Wishlist มากที่สุด</p>
                    <div className="m-auto border rounded-lg overflow-hidden shadow-md sm:w-full w-[450px]">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-gray-700 uppercase bg-[var(--lightblue)]">
                            <tr>
                            <th scope="col" className="px-6 py-4">ชื่อกองทุน</th>
                            <th scope="col" className="px-6 py-4 text-center">NAV ล่าสุด</th>
                            <th scope="col" className="px-6 py-4 text-center">จำนวน Wish</th>
                            <th scope="col" className="px-6 py-4 text-center">หนังสือชี้ชวน</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funds.map((fund, index) => (
                            <tr key={index} className="bg-white border-b border-gray-200 hover:bg-[var(--whiteblue)]"
                            >
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {fund.name}
                                </th>
                                <td className="px-6 py-4 text-center">{fund.nav}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className='mr-[8px] text-[var(--pink)]'>❤︎</span>
                                    {fund.wishlistCount} 
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <a href={fund.ffs} className="flex justify-center">
                                        <FfsIcon className='w-[24px] hover:stroke-[var(--pink)] stroke-[var(--blue)]' />
                                    </a>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    
                </div>    
            </div>
    </>
  )
}

export default FundHot