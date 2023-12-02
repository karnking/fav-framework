import React from 'react'
import {useNavigate} from 'react-router-dom'
import HomeImg from "../assets/logo.jpeg"

const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <img alt='homeImg' className='z-0 absolute h-[91vh] w-[100vw] opacity-50' src={HomeImg} />
            <div className='flex items-center h-[65vh] overflow-hidden justify-center'>
                <button className='z-2 text-lg relative border-2 border-black bg-white text-black p-3 uppercase font-semibold rounded-md' onClick={()=>navigate('/favourites')}>Discover Packages ➡️</button>
            </div>
        </>
    )
}

export default Home
