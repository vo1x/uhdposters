import React from 'react';

export default function GradientBackdrop({ url }) {
  return (
    <div className="absolute -z-10">
      <div className="relative h-[350px] w-screen overflow-hidden ">
        {/* <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-r from-transparent to-slate-900"></div> */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-l from-transparent to-slate-900"></div>
        {/* <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-slate-900"></div> */}
        {/* <div className="absolute inset-0  hidden h-0 bg-gradient-to-b from-slate-900 to-transparent md:block"></div> */}
        <div className="absolute bottom-0 left-0 right-0 hidden h-full bg-gradient-to-t from-slate-900 to-transparent md:block"></div>

        <img
          src={`${url}`}
          alt=""
          className="absolute inset-0 -z-20  block w-screen"
        />
      </div>
    </div>
  );
}
