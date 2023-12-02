import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import FavNpmRow from './utils/FavNpmRow'
import EmptyList from './utils/EmptyList'

const FavComp = () => {
  let data = JSON.parse(localStorage.getItem('favouriteNpms')) || [];
  const [favouriteNpms,setFavouriteNpms] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    setFavouriteNpms(data)
  },[data])
  return (
    <div className='md:p-10 xs:p-3'>
      <div className='flex justify-between mb-5 items-center flex-col md:flex-row'>
        <h1 className='font-bold md:text-xl text-lg text-slate-500 mx-2 my-5'>Welcome to Favourite NPM Packages</h1>
        {favouriteNpms.length>0 && <button onClick={() => navigate('/addFav')} className='inline-block rounded bg-neutral-800 p-5 py-3 text-xs font-bold uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]'>Add Fav</button>}
      </div>
      <div className='w-full'>
        {favouriteNpms.length > 0
          ? <table className='w-full border-2'>
            <thead className='bg-cyan-200 border-b'>
              <tr>
                <th className='py-2 border-r-2 border-gray-300'>Package Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {favouriteNpms?.map((ele, i) => <FavNpmRow id={i} data={ele} />)}
            </tbody>
          </table>
          : <EmptyList />
        }
      </div>
    </div>
  )
}

export default FavComp
