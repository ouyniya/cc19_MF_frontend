export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mt-10 mx-auto p-6 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
      
      <p>
        เว็บไซต์ของเราให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน และมุ่งมั่นในการปกป้องข้อมูลส่วนบุคคลตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">1. ข้อมูลที่เราเก็บรวบรวม</h2>
        <ul className="list-disc list-inside">
          <li>ชื่อผู้ใช้ (Username)</li>
          <li>ชื่อจริงและนามสกุล (First name, Last name)</li>
          <li>อีเมล (Email)</li>
          <li>รูปโปรไฟล์ (Profile image - ถ้ามี)</li>
          <li>ข้อมูลการใช้งานที่เกี่ยวข้อง</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">2. วัตถุประสงค์ของการเก็บข้อมูล</h2>
        <p>
          เราเก็บและใช้ข้อมูลของคุณเพื่อ:
        </p>
        <ul className="list-disc list-inside">
          <li>ให้คุณสามารถเข้าสู่ระบบและใช้บริการต่าง ๆ บนเว็บไซต์</li>
          <li>แสดงโปรไฟล์ส่วนตัวของคุณ</li>
          <li>ให้คุณสามารถเขียน/แก้ไขข้อมูลส่วนตัวและข้อมูลเพื่อรับบริการกับทางเว็บไซต์</li>
          <li>ป้องกันการปลอมแปลงหรือเข้าถึงโดยไม่ได้รับอนุญาต</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">3. การจัดเก็บและการปกป้องข้อมูล</h2>
        <p>
          ข้อมูลของคุณถูกจัดเก็บบนเซิร์ฟเวอร์ที่มีระบบรักษาความปลอดภัย และเราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสมเพื่อป้องกันข้อมูลสูญหายหรือถูกเข้าถึงโดยไม่ได้รับอนุญาต
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">4. การเปิดเผยข้อมูล</h2>
        <p>
          เราไม่เปิดเผยข้อมูลของคุณต่อบุคคลภายนอก ยกเว้นในกรณีที่:
        </p>
        <ul className="list-disc list-inside">
          <li>ได้รับความยินยอมจากคุณ</li>
          <li>เป็นไปตามข้อกำหนดของกฎหมาย</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">5. สิทธิของเจ้าของข้อมูล</h2>
        <p>
          คุณสามารถขอเข้าถึงข้อมูลของคุณ แก้ไข หรือลบข้อมูล และถอนความยินยอม (ในกรณีที่ใช้ consent) โดยติดต่อผ่านอีเมล: <a href="mailto:support@nysdev.com" className="text-blue-600 underline">support@nysdev.com</a>
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">6. คุกกี้ (Cookies)</h2>
        <p>
          เว็บไซต์นี้ใช้คุกกี้จำเป็นเพื่อให้คุณสามารถเข้าสู่ระบบผ่านระบบและจัดการ session อย่างปลอดภัย<br/>
          ไม่มีการใช้คุกกี้เพื่อวัตถุประสงค์ทางการตลาดหรือการโฆษณา
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">การเปลี่ยนแปลงนโยบาย</h2>
        <p>
          เราขอสงวนสิทธิ์ในการแก้ไขนโยบายความเป็นส่วนตัวนี้ตามความเหมาะสม โดยจะมีการประกาศบนเว็บไซต์หากมีการเปลี่ยนแปลง
        </p>
      </section>
    </div>
  );
}
