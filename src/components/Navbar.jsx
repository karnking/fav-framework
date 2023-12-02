import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import HomeImg from "../assets/logo.jpeg"

const Navbar = () => {
  const links = [{ title: "Favourite Packages", path: "favourites" }, { title: "Add Favourites", path: "addFav" }]
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className='items-center bg-cyan-200 text-slate-500 font-sans uppercase z-10 w-full p-3 flex justify-around font-bold'>
      {links?.map(linkObj => {
        return <>
          <Link className={`hover:bg-cyan-500 hover:text-white rounded-md p-2 ${location.pathname==='/'+linkObj.path ? 'bg-white' : ''}`} to={linkObj.path}>{linkObj.title}</Link>
        </>
      })}
      <div className='w-[50%] flex justify-end'>
        <img alt='logo' src={HomeImg} onClick={() => navigate('/')} className='w-20 h-10 cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar
