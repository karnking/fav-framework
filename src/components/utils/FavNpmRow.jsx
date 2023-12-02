import React, { useState } from 'react'
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import FavDetails from './FavDetails';
import FavDelete from './FavDelete';
import FavEdit from './FavEdit';

const FavNpmRow = ({ data }) => {
    const { choice } = data
    const [showDetail,setShowDetail] = useState(false)
    const showFav = async () => {
        setShowDetail(true)
    }
    const [showEdit,setShowEdit] = useState(false)
    const editFav = () => {
        setShowEdit(true)
    }
    const [showDel,setShowDel] = useState(false)
    const delFav = () => {
        setShowDel(true)
    }
    return (
        <>
            <tr className='bg-white border-b justify-center w-full transition duration-300 ease-in-out hover:bg-gray-100'>
                <td className='px-6 py-2 whitespace-nowrap text-center border-r-2'>{choice}</td>
                <td className='px-6 py-2 flex w-full justify-center items-center mt-1 gap-8 whitespace-nowrap'>
                    <FaEye className='cursor-pointer text-cyan-500' onClick={showFav} />
                    <FaEdit className='cursor-pointer text-green-500' onClick={editFav} />
                    <FaTrash className='cursor-pointer text-red-500' onClick={delFav} />
                </td>
            </tr>
            <FavDetails showDetail={showDetail} data={data} setShowDetail={setShowDetail}/>
            <FavEdit showEdit={showEdit} data={data} setShowEdit={setShowEdit}/>
            <FavDelete showDel={showDel} data={data} setShowDel={setShowDel}/>
        </>
    )
}

export default FavNpmRow
