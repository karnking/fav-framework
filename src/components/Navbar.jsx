import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { GiHamburgerMenu } from "react-icons/gi";

import HomeImg from "../assets/logo.jpeg"

const Navbar = () => {
  const links = [{ title: "Favourite Packages", path: "favourites" }, { title: "Add Favourites", path: "addFav" }]
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className='items-center bg-cyan-200 text-slate-500 font-sans uppercase z-10 w-full p-3 flex justify-around font-bold'>
      <div className='block md:hidden'>
        <GiHamburgerMenu size={'2rem'} onClick={() => setShowMenu(prev=>!prev)} />
        {showMenu && <nav className='flex flex-col absolute border-[1px] h-[10vh] bg-white border-black'>
          {links?.map(linkObj => {
            return <>
              <Link className='text-base capitalize border-black p-2' onClick={()=>setShowMenu(false)} to={linkObj.path}>{linkObj.title}</Link>
              <hr />
            </>
          })}
        </nav>}
      </div>
      <div className='justify-between hidden md:flex md:w-[30%]'>
        {links?.map(linkObj => {
          return <>
            <Link className={`hover:bg-cyan-500 hover:text-white rounded-md text-center p-1 md:p-2 ${location.pathname === '/' + linkObj.path ? 'bg-white' : ''}`} to={linkObj.path}>{linkObj.title}</Link>
          </>
        })}
      </div>
      <div className='w-[50%] flex justify-end'>
        <img alt='logo' src={HomeImg} onClick={() => navigate('/')} className='w-20 h-10 cursor-pointer' />
      </div>
    </nav>
  )
}

export default Navbar
