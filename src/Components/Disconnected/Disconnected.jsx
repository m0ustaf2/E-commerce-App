import React from 'react'

export default function Disconnected() {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center">
    <div className="text-center text-danger bg-dark offline rounded-2 ">
    <i className="fa-solid fa-ban"></i>  Yor connection is not stable
    </div>
    </div>
    </>
    
  )
}
