import React from 'react'
import errorimg from '../../assets/images/error.svg'
import { Helmet } from 'react-helmet'
export default function Notfound() {
  return (
    <>
    <Helmet>
              <title>Error 404 (Not Found)</title>
            </Helmet>
    <div className='text-center py-5'>
      <img src={errorimg} alt="404" />
    </div>
    </>
  )
}
