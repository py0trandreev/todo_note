import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js'
import MenuList from './components/Menu.js'
import Navbar from './components/Menu.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import TodoList from './components/TODO.js'
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


    }


    getProject(id) {
        console.log('call')
        console.log(getUrl(`/api/projects/${id}`))
        axios.get(getUrl(`/api/projects/${id}`))
        .then(response => {
            console.log(response.data)
            this.setState({project: response.data})
        }).catch(error => console.log(error))
    }


    componentDidMount(){
        axios.get(getUrl('/api/users/'))
        .then(response => {
            console.log(response.data)
            this.setState({users: response.data.results})
        }).catch(error => console.log(error));

        axios.get(getUrl('/api/projects/'))
        .then(response => {
            //console.log(response.data)
            this.setState({projects: response.data.results})
        }).catch(error => console.log(error));

        axios.get(getUrl('/api/todos/'))
        .then(response => {
            //console.log(`App.js(componentDidMount)************************************ ${JSON.stringify(response.data.results)}`)
            this.setState({todos: response.data.results})
        }).catch(error => console.log(error));
   }

   render () {
       return (
           <Router>
               <header>
                    <Navbar navbarItems={this.state.navbarItems} />
               </header>
               <main role="main" class="flex-shrink-0">
                      <div className="container">
                        <Switch>
                            <Route exact path='/users'>
                                <UserList users={this.state.users} />
                            </Route>
                            <Route exact path='/projects'>
                                <ProjectList items={this.state.projects} />
                            </Route>
                            <Route exact path='/todos'>
                                <TodoList items={this.state.todos} />
                            </Route>
                            <Route path="/project/:id" children={<ProjectDetail getProject={(id) => this.getProject(id)} item={this.state.project} />} />
                        </Switch>
                      </div>
                  </main>
           </Router>

        // <div>
        //   <MenuList />
        //   <UserList users={this.state.users} />
        //   <p></p>
        //   <FooterItem />
        // </div>
       )
   }
}

export default App;
