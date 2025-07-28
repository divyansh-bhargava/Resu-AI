import React from 'react'
import { Link } from 'react-router'

const NavBar = () => {
  return (
    <nav className='navbar'>
        <Link to={'/'} >
            <p className='text-2xl font-bold text-gradient'>RESUAI</p>
        </Link>
        <Link to={"/upload"}>
            <button className='primary-button'>Upload Resume</button>
        </Link>
    </nav>
  )
}

export default NavBar