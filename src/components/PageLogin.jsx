import React from 'react';

export default function PageLogin({ children, logoIn,Register,PGLSty }) { // ใช้ตัวพิมพ์เล็ก 'children'
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-7 d-flex justify-content-center align-items-center  position-relative" style={{background:'linear-gradient(163deg, rgba(250, 240, 231,1) 0%, rgba(200, 104, 17 ,1) 100%)'}}>
          <div className="w-50" style={PGLSty}>
            {children} {/* ใช้ children ที่ส่งเข้ามา */}
          </div>
        </div>

        <div className="col-md-5 d-flex bg-dark text-white p-0 position-relative">
          <img 
            src={logoIn} // รับ logoIn ที่ส่งเข้ามา
            alt="Image" 
            className="img-fluid w-100 h-100" 
            style={{ objectFit: 'cover', opacity: '50%' }} 
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <span style={{ fontSize: '60px' }}>M R V</span>
            <p>Your Energy Solution</p>
          </div>
        </div>
      </div>
    </div>
  );
}
