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



class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldValue:'',
        };
    };

    print =()=>{
        console.log("*****////////" + this.props);
    }

    changeTitle = (e) => {
        this.setState({fieldValue: e.target.value});
    }


    render() {
     return (
        <div>
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-menu">
                    <div className="navbar-start">
                        {this.props.navbarItems.map((item) => <NavbarItem name={item.name} href={item.href}/>)}

                    </div>

                        <div className="navbar-end">

                            <div className="navbar-item">
                                <div className="field has-addons">
                                    <div className="control">
                                        <input className="input" type="text" value={ this.state.fieldValue }
                                               onChange={ this.changeTitle } placeholder="Search"/>
                                        {/*console.log(this.state.fieldValue)*/}

                                    </div>
                                    <div className="control">
                                        {/*<div hidden> { input_txt = this.state.fieldValue }</div>*/}
                                        <a className="button is-info" onClick={()=>this.props.setProjSearch(this.state.fieldValue) }>
                                            Search
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </nav>

        </div>
    )}
}

export default Navbar