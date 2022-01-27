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