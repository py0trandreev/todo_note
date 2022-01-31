import React, { useState } from 'react'

import {
  Link
} from "react-router-dom";

let input_txt = '';
function filter(){
    alert(input_txt);
}




function NavbarItem({name, href}) {
    return (
        // <li className="nav-item">

        <a className="navbar-item has-text-light">
            <Link className="nav-link" to={href}>  {name}  </Link>
        </a>

        // name !== "Login" ?
        // :
        //
        // <a className="navbar-item has-text-light">
        //     {/*<Link className="nav-link" to={href}>  {name}  </Link>*/}
        //     {/*{isAuthenticated ? name = "Logout" : name}*/}
        //     <div hidden>{isAuthenticated ? name = "Logout" : name = "Login"}</div>
        //     <div hidden>{console.log("*-*-*-*-" + isAuthenticated)}</div>
        //     <Link className="nav-link" to={href}>{name}</Link>
        //
        // </a>
          //// {isAuthenticated ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                    // </li>
    )
}


export default function Navbar({navbarItems, isLogedIn, logOut}) {
    const [title, setTitle] = useState('');



    console.log(isLogedIn)
    return (
        <div>
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href}/>)}
                        <Link to='/login'>Login</Link>
                        <button onClick={()=>this.logout()}>Logout</button>

                    </div>

                        <div className="navbar-end">

                            <div className="navbar-item">
                                <div className="field has-addons">
                                    <div className="control">
                                        <input className="input" type="text" value={ title }
                                               onChange={ event => setTitle(event.target.value) } placeholder="Search"/>
                                    </div>
                                    <div className="control">
                                        <div hidden> { input_txt = { title }.title }</div>
                                        <a className="button is-info" onClick={ filter }>
                                            Search
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </nav>

        </div>
    )
}