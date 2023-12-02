import React from 'react'
import {Routes,Route} from "react-router-dom"
import FavComp from './FavComp'
import Home from './Home'
import SearchComp from './AddFavComp'
import AddFavComp from './AddFavComp'
const AllRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/favourites' element={<FavComp />}/>
        <Route path='/addFav' element={<AddFavComp />}/>
      </Routes>
  )
}

export default AllRoutes
