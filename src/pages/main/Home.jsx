import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import Header from '../../components/Header'
import AssetBoxes from '../../components/AssetBoxes'
import FundHot from '../../components/FundHot'
import FAQs from '../../components/FAQs'
import HeadingSection from '../../components/HeadingSection'
import '../../../src/index.css'
import Stat from '../../components/Stat'

function Home() {

    const topic = [
        'เลือกกองทุนตามประเภทสินทรัพย์ลงทุน',
        'กองทุนน่าจับตามอง',
        'FAQs'
    ]

    const assetBoxes = [
        { 
            text:'ตราสารหนี้ระยะสั้น',
            beginColor: 'darkblue',
            endingColor: 'mediumblue'
        },
        { 
            text:'ตราสารหนี้ระยะสั้น',
            beginColor: 'mediumblue',
            endingColor: 'pink'
        },
        { 
            text:'ตราสารทุน',
            beginColor: 'pink',
            endingColor: 'orange'
        },
        { 
            text:'ทรัพย์สินทางเลือก',
            beginColor: 'orange',
            endingColor: 'green'
        }
    ]

    const funds = [
        { name: "K-BANKING", nav: 20.15, wishlistCount: 150, ffs:'https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf' },
        { name: "T-Stock", nav: 15.75, wishlistCount: 135, ffs:'https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf' },
        { name: "B-Fixed", nav: 10.90, wishlistCount: 120, ffs:'https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf' },
        { name: "B-Fixed", nav: 10.90, wishlistCount: 110, ffs:'https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf' },
        { name: "B-Fixed", nav: 10.90, wishlistCount: 100, ffs:'https://secdocumentstorage.blob.core.windows.net/fundfactsheet/M0003_2563.pdf' },
      ];

    const faqs = [
        { 
          question: "ทำไมต้องลงทุนใน Mutual fund", 
          answer: "Mutual fund ช่วยกระจายความเสี่ยงในการลงทุน โดยมีผู้จัดการกองทุนบริหารให้ เหมาะสำหรับผู้ที่ต้องการลงทุนแต่ไม่มีเวลาหรือความเชี่ยวชาญในการเลือกหุ้นเอง"
        },
        { 
          question: "เว็บไซต์นี้ช่วยอะไรได้บ้าง?", 
          answer: "เว็บไซต์นี้ช่วยให้คุณสามารถคัดกรองกองทุนตามเงื่อนไขที่ต้องการ เพิ่มกองทุนลงใน Wishlist และศึกษาข้อมูลกองทุนเพื่อการเรียนรู้ โดยไม่มีวัตถุประสงค์เพื่อการแนะนำการลงทุน"
        },
        { 
          question: "การเพิ่มกองทุนลงใน Wishlist มีประโยชน์อย่างไร?", 
          answer: "การเพิ่มกองทุนลงใน Wishlist ช่วยให้คุณสามารถติดตามกองทุนที่สนใจ และเปรียบเทียบข้อมูลได้ง่ายขึ้นโดยไม่ต้องค้นหาใหม่ทุกครั้ง"
        },
        { 
          question: "ข้อมูลในเว็บไซต์นี้เชื่อถือได้หรือไม่?", 
          answer: "ข้อมูลในเว็บไซต์นี้จัดทำขึ้นเพื่อการศึกษาและอ้างอิงจากแหล่งข้อมูลที่น่าเชื่อถือ อย่างไรก็ตาม โปรดตรวจสอบข้อมูลจากแหล่งข้อมูลทางการก่อนตัดสินใจลงทุน"
        },
        { 
          question: "เว็บไซต์นี้มีค่าใช้จ่ายหรือไม่?", 
          answer: "เว็บไซต์นี้ให้บริการฟรีสำหรับการศึกษาข้อมูลเกี่ยวกับกองทุน ไม่มีค่าธรรมเนียมในการใช้งาน"
        }
      ];

  return (
    <>        
        <div className='max-w-7xl min-w-[300px] m-auto'>
            <Header />
            <Stat />
            <SearchBar />

            <HeadingSection text={topic[0]} />
            <div className='sm:flex px-[24px] sm:gap-5 flex-wrap xl:flex-nowrap'>
                {
                    assetBoxes.map((item, index) => (
                        <AssetBoxes 
                            key={index}
                            text={item.text} 
                            beginColor={item.beginColor} 
                            endingColor={item.endingColor}
                            style={{
                                background: `linear-gradient(to bottom right, var(--${item.beginColor}), var(--${item.endingColor}))`
                            }}
                        />
                    ))
                }
            </div>
            
            
            <HeadingSection text={topic[1]} />
            <FundHot funds={funds} />

            
            <HeadingSection text={topic[2]} />
            <FAQs faqs={faqs} />
        </div>
    </>
  )
}

export default Home