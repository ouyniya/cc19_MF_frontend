// สร้างแอป React, ใช้ React Router สำหรับการจัดการหน้า, และเรนเดอร์แอปในหน้า HTML ที่มี <div id="root"></div>.

import { createRoot } from 'react-dom/client' //เริ่มต้นแอป React ใน React 18 ขึ้นไป เพื่อให้ React สามารถจัดการ DOM (Document Object Model) ได้
import './index.css'
import App from './App.jsx' //นำเข้า component หลัก
import { BrowserRouter } from 'react-router' //ช่วยในการทำ routing (การเปลี่ยนหน้า) ในแอปพลิเคชันแบบ single-page application (SPA)

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
  {/* เปิดใช้งานการทำ routing ของ React */}
    <App />
  </BrowserRouter>,
)
