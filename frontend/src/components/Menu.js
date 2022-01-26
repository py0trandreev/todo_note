// import React from 'react'

// const MenuList = () => {
//     return (
//         <div class="topnav">
//         <a class="active" href="#users"> Users </a>
//         <a href="#projects"> Projects </a>
//         <a href="#todos"> TODOs</a>
//         </div>
//     )
//  }

// export default MenuList

import React from 'react'
import {
  Link
} from "react-router-dom";

function NavbarItem({name, href}) {
    return (
        <li className="nav-item">
          <Link className="nav-link" to={href}>  {name}  </Link>
        </li>
    )
}


export default function Navbar({navbarItems}) {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            {/* <a className="navbar-brand" href="#">Fixed navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href} />)}
                </li>
              </ul>
              <form className="form-inline mt-2 mt-md-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
    )
}