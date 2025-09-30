import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900    ">
        <div className="mycontainer text-white  flex justify-between px-4 py-4 h-14 items-center ">

      <div className="logo font-bold text-2xl ">
        
       <span className="font-bold   text-green-800"> &lt;</span>
        
       Pass<span className="font-bold text-green-800  ">OP/&gt;</span>
     
        </div>
      {/* <ul className="">
        <li className=" flex gap-6">
          <a className="hover:font-bold" href="/">Home</a>
          <a className="hover:font-bold" href="#">About</a>
          <a className="hover:font-bold" href="*">contact</a>
        </li>
      </ul> */}
      <button className="text-white  flex justify-between items-center bg-green-800 rounded-full my-6  ring-1 ring-white" >
        <img className="invert  w-10 p-1" src="/icons/github.svg" alt="github logo" />
        <span className="font-bold px-2  ">GitHub</span>
      </button >
        </div>
    </nav>
  );
};
export default Navbar;
