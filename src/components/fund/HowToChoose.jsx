import React from 'react'
import { Filter, BookOpenText, MessageSquareMore } from 'lucide-react';

function HowToChoose() {
  return (
    <>
    <div className="collapse mb-[48px] mx-[16px] ">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium ">
            ขั้นตอนการเลือกกองทุนรวมที่ใช่
        </div>
        <div className="collapse-content">
            <div className='md:flex gap-5 m-auto p-5'>
                <div className="card bg-base-100 w-[300px] sm:w-full shadow-xl md:basis-1/3 mb-[24px]">
                    <span className="ribbon absolute -top-[12px] -left-[12px] text-center rounded-full bg-[var(--blue)] text-white p-[8px]">ขั้นตอนที่ 1</span>
                    <div className='h-[150px] bg-[var(--yellow)] flex justify-center'>
                        <Filter className='size-[100px] stroke-white' />
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">คัดกรองกองทุนรวม</h2>
                        <p>ระบุประเภทและนโยบายการลงทุนของกองทุนรวม จากนั้น ระบุเงื่อนไข เช่น ชื่อบริษัทหลักทรัพย์ จัดการกองทุน (บลจ.), การจ่ายปันผล, ระดับความเสี่ยง เป็นต้น</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-[300px] sm:w-full shadow-xl md:basis-1/3 mb-[24px]">
                    <span className="ribbon absolute -top-[12px] -left-[12px] text-center rounded-full bg-[var(--blue)] text-white p-[8px]">ขั้นตอนที่ 2</span>
                    <div className='h-[150px] bg-[var(--pink)] flex justify-center'>
                        <BookOpenText className='size-[100px] stroke-white' />
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">เจาะลึกหนังสือชี้ชวน</h2>
                        <p>ศึกษาข้อมูลจากเอกสาร Fund Fact Sheet 
                        และเปรียบเทียบผลการดำเนินงาน ความเสี่ยง ค่าธรรมเนียม ทรัพย์สินที่ลงทุน เป็นต้น กับ กองทุนที่อยู่ในกลุ่มเดียวกัน</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-[300px] sm:w-full shadow-xl md:basis-1/3 mb-[24px]">
                    <span className="ribbon absolute -top-[12px] -left-[12px] text-center rounded-full bg-[var(--blue)] text-white p-[8px]">ขั้นตอนที่ 3</span>
                    <div className='h-[150px] bg-[var(--green)] flex justify-center'>
                        <MessageSquareMore className='size-[100px] stroke-white' />
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">วิเคราะห์ข้อมูลอื่นๆ</h2>
                        <p>พิจารณาปัจจัยแวดล้อมอื่นๆ เช่น สภาพเศรษฐกิจขณะนั้น รวมถึงขนาดของกองทุนที่อาจส่งผลต่อต้นทุนและสภาพคล่องของกองทุนนั้นๆ ได้ เป็นต้น</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

        
    </>
  )
}

export default HowToChoose