import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
       <div className="text-center">
      <div className="list-group m-3 p-3">
        <h4>Admin Panel</h4>

        <div className="card mb-1">
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
            Create Category
          </NavLink>
        </div>

        <div className="card mb-1">
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
            Create Product
          </NavLink>
        </div>


        <div className="card mb-1">
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
            products
          </NavLink>
        </div>

        <div className="card mb-1">
          <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
            Orders
          </NavLink>
        </div>

        <div className="card mb-1">
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            Users
          </NavLink>
        </div>

      </div>
    </div>
    </>
  );
};

export default AdminMenu;
