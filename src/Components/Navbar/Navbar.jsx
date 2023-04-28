import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext'

export default function Navbar({userData,logout}) {
let{numOfCartItems}=useContext(cartContext)

  return (
    <>
   <nav className="navbar navbar-expand-lg bg-main-light  position-sticky top-0">
  <div className="container">
    <Link className="navbar-brand" to="/E-commerce-App">
    <img src={logo} alt="logo" />

    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon fa-beat" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userData?
        <><li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/brands">Brands</Link>
      </li>
      <li className="nav-item position-relative">
        <Link className="nav-link" to="/cart">Cart
        <i className='fas mx-1 text-main fa-shopping-cart fa-lg'></i>
        <span className=' badge  position-absolute top-0   bg-main text-white'>
        {numOfCartItems}
        </span>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link ms-2" to="/allorders">All orders</Link>
      </li></>:""}
      
      </ul>
      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
      <div className='icon  d-flex align-items-center'>
      <li className="nav-item">
      <a target={'_blank'} href="https://www.facebook.com/profile.php?id=100004498818792&mibextid=ZbWKwL">
          <i className='fab fa-facebook mx-2'></i>
          </a>
          <i className='fab mx-2 fa-twitter cursor-pointer'></i>
          <a target={'_blank'} href="https://instagram.com/mostafa_2sma3el?igshid=ZmZhODViOGI=">
          <i className='fab fa-instagram mx-2'></i>
          </a>
          <a target={'_blank'} href="https://github.com/m0ustaf2">
          <i className='fa-brands fa-github mx-2'></i>
          </a>
          <a target={'_blank'} href="https://www.linkedin.com/in/mostafa-esmail-912910218/">
          <i className='fa-brands fa-linkedin-in mx-2'></i>
          </a>
          <i className='fab mx-2 fa-youtube cursor-pointer'></i>
        </li>
      </div>
       {userData?
        <>
      <li className="nav-item">
        <Link  className="nav-link  text-main">Hello,{userData?.name}</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link"  onClick={logout}>Logout</Link>
      </li></>:
       <>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
       </>}
        
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}
