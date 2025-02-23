import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';

function FAQs(props) {

  const { faqs } = props; // arr
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  

  return (
    <>
      {faqs.map((faq, index) => (
        <div key={index} className="collapse dark:border-gray-600 border-base-200 border-b-2 rounded-none">
          <input
            type="checkbox"
            checked={openIndex === index}
            onChange={() => toggle(index)}
          />
          <div className="collapse-title text-xl font-medium">
            <div className="flex justify-between">
              <p>{faq.question}</p>
              <div className='p-1 rounded-full'>
              <ChevronDown
                className={`w-[24px] ${openIndex === index ? 'rotate-180' : ''}`}
              />
              </div>
            </div>
          </div>
          <div className="collapse-content">
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
      
    </>
  )
}

export default FAQs