import React from "react";

function ExampleWeb() {
  return (
    <>
      <div className="mockup-browser border border-base-300 w-4/5 m-auto">
        <div className="mockup-browser-toolbar">
          <div className="input">My Wish Fund</div>
        </div>
        <div className="grid place-content-center h-auto">

        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto object-cover"
        >
          <source src="src/assets/web.mp4" type="video/mp4" />
        </video>
        </div>
      </div>
    </>
  );
}

export default ExampleWeb;


  
