import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaEdit } from 'react-icons/fa';

const FavEdit = ({ data, showEdit, setShowEdit }) => {
    const cancelButtonRef = useRef(null)
    let favouriteNpms = JSON.parse(localStorage.getItem('favouriteNpms')) || []
    const [reason, setReason] = useState(data?.reason)
    const handleEdit = () => {
        favouriteNpms = favouriteNpms?.map(ele=>{
            if(ele.choice==data.choice) return {...ele,reason:reason}
            else return ele
        })
        localStorage.setItem('favouriteNpms',JSON.stringify(favouriteNpms))
        setShowEdit(false)
    }
    return (
        <Transition.Root show={showEdit} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShowEdit}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <FaEdit className="h-6 w-6 text-green-500" aria-hidden="true" />
                                        </div>
                                        <div className="mt-2 w-full">
                                            <h2 className='font-semibold mt-5 mb-1 px-1 text-md'>Edit why is "{data?.choice}" your Favourite?</h2>
                                            <div className='p-1'>
                                                <textarea placeholder='Enter reason here!' className='border-2 w-full px-3 py-2' name="reason" rows="6" onChange={(e) => setReason(e.target.value)}>{reason}</textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex disabled:bg-slate-300 w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:ml-3 sm:w-auto"
                                        onClick={handleEdit}
                                        disabled={reason===""}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setShowEdit(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default FavEdit
