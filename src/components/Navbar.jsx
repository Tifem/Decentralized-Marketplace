import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
        <div className='logo'>
            <h2>WEB3.PRODUCT</h2>
        </div>
        <div className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/list-products">List Products</NavLink>
            <NavLink to="/transaction">Transaction History</NavLink>
            <button>Connect Wallet</button>
        </div>
    </header>
  )
}

export default Navbar