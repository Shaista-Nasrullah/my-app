import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className="text-center">
   <div className="list-group m-3 p-3">
     <h4>Dashboard</h4>

     <div className="card mb-1">
       <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
         Profile
       </NavLink>
     </div>

     <div className="card mb-1">
       <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
         Orders
       </NavLink>
     </div>

   

   </div>
 </div>
 </>
  )
}

export default UserMenu
