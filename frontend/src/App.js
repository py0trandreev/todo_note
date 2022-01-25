import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import MenuList from './components/Menu.js'
import FooterItem from './components/Footer.js'
import axios from 'axios'

const DOMAIN = 'http://127.0.0.1:8000'
const getUrl = (endPoint) => `${DOMAIN}${endPoint}`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/users'},
                {name: 'Projects', href: '/projects'},
                {name: 'TODOs', href: '/todos'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: []
        }

    //this.getProject = this.getProject.bind(this);
    }

    componentDidMount(){
        axios.get(getUrl('/api/users/'))
        .then(response => {
            console.log(response.data)
            this.setState({users: response.data.results})
        }).catch(error => console.log(error))
   }

   render () {
       return (
        <div>
          <MenuList />
          <UserList users={this.state.users} />
          <p></p>
          <FooterItem />
        </div>
       )
   }
}

export default App;
