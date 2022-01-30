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
        <a className="navbar-item has-text-light">
            <Link className="nav-link" to={href}>  {name}  </Link>
        </a>
    )
}


export default function Navbar({ navbarItems }) {
    const [title, setTitle] = useState('');

    return (
        <div>
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        { navbarItems.map((item) => <NavbarItem name={ item.name } href={ item.href }/>) }
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