import React from 'react'
import { Outlet } from 'react-router-dom'

const PrivateRoutes = ({role}) => {
  if(role!=="admin"){
    return 
  }
  return <Outlet/>
}

export default PrivateRoutes