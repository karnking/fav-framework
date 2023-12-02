import React, { useEffect, useState } from 'react'
import { AiOutlineLoading } from "react-icons/ai";
import AlertComp from './utils/AlertComp';

import axios from 'axios'

const iniState = {
  choice: "",
  reason: ""
}
const AddFavComp = () => {
  const [search, setSearch] = useState("")
  const [formObj, setFormObj] = useState(iniState)
  const [npmChoices, setNpmChoices] = useState([])
  const handleSearchBox = (e) => {
    setSearch(e.target.value)
  }
  const [loading, setLoading] = useState(false)
  const handleSearch = async () => {
    setLoading(true)
    setFormObj(iniState)
    try {
      const data = await axios.get(`https://api.npms.io/v2/search?size=100&q=${search}`)
      setNpmChoices(data.data.results)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const debounce = (func, timeout = 1000) => {
    let timer;
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func()
    }, timeout)
    return () => {
      clearTimeout(timer);
    }
  }
  const favouriteNpms = JSON.parse(localStorage.getItem('favouriteNpms')) || []
  const [showAlert, setShowAlert] = useState(false)
  const [error, setError] = useState(false)
  const handleForm = (e) => {
    e.preventDefault();
    setError(false)
    let temp = favouriteNpms.filter(ele => ele.choice === formObj.choice)
    if (temp.length > 0) {
      setShowAlert(true);
      setError(true)
      return;
    }
    localStorage.setItem('favouriteNpms', JSON.stringify([...favouriteNpms, formObj]))
    setShowAlert(true);
    setError(false)
    setSearch('')
    setFormObj({ ...formObj, 'reason': '' })
  }
  useEffect(() => {
    const cleanup = debounce(handleSearch)
    return () => cleanup()
  }, [search])

  return (<>
    <div className='p-9'>
      <div className='p-10'>
        <label for="searchnpm" className='font-semibold'>Search for NPM Packages</label>
        <input name="searchnpm" className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" placeholder='For e.g. React, Angular...' value={search} onChange={handleSearchBox} />
      </div>
      <form>
        <div className='px-10'>
          <h2 className='font-semibold text-lg'>Results : </h2>
          <div className='flex flex-col overflow-y-scroll p-2'>
            {loading ? <AiOutlineLoading className='animate-spin' size={'3vw'} />
              : search === "" ? <div className='text-green-600'>
                Enter package names to search
              </div>
                : npmChoices.length <= 0 ? <div className='text-red-600'>
                  No Such package found
                </div>
                  : npmChoices?.map(choice => {
                    return <div className='flex items-center h-[20vh] hover:bg-cyan-100 hover:py-1' onClick={() => setFormObj({ ...formObj, choice: choice.package.name })}>
                      <input type='radio' name='choice' value={choice.package.name} className='accent-cyan-300 mt-1 mx-2' checked={formObj.choice === choice.package.name} onChange={() => setFormObj({ ...formObj, choice: choice.package.name })} />
                      <label>{choice.package.name}</label>
                    </div>
                  })}
          </div>
          <h2 className='font-semibold mt-5 mb-1 px-1 text-lg'>Why is this your Favourite?</h2>
          <div className='p-1'>
            <textarea disabled={formObj?.choice == ""} value={formObj?.reason} placeholder='Enter reason here!' className='border-2 w-full px-5 py-2' name="reason" rows="6" onChange={(e) => setFormObj({ ...formObj, reason: e.target.value })}>{formObj.reason}</textarea>
          </div>
          <div className='flex justify-end'>
            <button onClick={handleForm} disabled={formObj?.choice==="" || formObj.reason===""} className='inline-block disabled:hover:bg-slate-500 disabled:bg-slate-500 rounded bg-neutral-800 px-8 py-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]'>Submit</button>
          </div>
        </div>
      </form>
    </div>
    <AlertComp showAlert={showAlert} error={error} setShowAlert={setShowAlert} />
  </>
  )
}

export default AddFavComp
