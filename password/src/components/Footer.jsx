import React from 'react'

const Footer = () => {
  return (

    <div className='flex flex-col justify-center items-center bg-slate-800 text-white w-full'>
        <div className="logo font-bold text-2xl ">       
        <span className="font-bold   text-green-800"> &lt;</span>         
        Pass<span className="font-bold text-green-800  ">OP/&gt;</span>     
     </div>

        <div className='flex'>
          Created With  <img className='mx-1' width={22} src="/icons/heart.png" alt="" /> by CodeWithJay
        </div>
     </div>
  )
}

export default Footer