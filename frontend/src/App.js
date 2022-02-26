import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Link, Redirect,
} from "react-router-dom";

import 'bulma/css/bulma.min.css';
import './App.css';
import UserList from './components/User.js'
import MenuList from './components/Menu.js'
import Navbar from './components/Menu.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import TodoList from './components/TODO.js'
import FooterItem from './components/Footer.js'
import axios from 'axios'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";



const DOMAIN = 'http://127.0.0.1:8000'
const getUrl = (endPoint) => `${DOMAIN}${endPoint}`


const NotFound404 = ({ location }) => {
  return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/'},
                {name: 'Projects', href: '/projects'},
                {name: 'TODOs', href: '/todos'},
            ],
            users: [],
            projects: [],
            project: {},

            todos: [],
            'token': '',
            projSearch: '',
           }
    }


    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token !== '';
    }

    logout() {
        this.set_token('');
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post(getUrl('/api-token-auth/'), {username: username, password: password})
            .then(response => {
                //console.log(response.data)
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'));
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
        {
            headers['Authorization'] = 'token ' + this.state.token
        }
        return headers
    }

   load_data() {
        const headers = this.get_headers();
        axios.get(getUrl('/api/users/'),{headers})
            .then(response => {
                console.log(`response.data ******* ${response.data}`);
                this.setState({users: response.data.results});
            }).catch(error => console.log(error)

        );

        axios.get(getUrl('/api/projects/'),{headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error));

        axios.get(getUrl('/api/todos/'),{headers})
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => {
                console.log(error);
                this.setState({users: []});

            });
    }

    getProject(id) {
        axios.get(getUrl(`/api/projects/${id}`))
        .then(response => {
            this.setState({project: response.data})
        }).catch(error => console.log(error));
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(getUrl(`/api/projects/${ id }`), { headers })
            .then(response => {
                this.setState({ projects: this.state.projects.filter((item) => item.id !== id) })
            }).catch(error => console.log(error))
    }

    createProject(name, repository, users) {
        const headers = this.get_headers()
        const data = { name: name, repository: repository, users: users }
        axios.post(getUrl('/api/projects/'), data, { headers })
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((item) => item.id === new_project.users)[0]
                new_project.users = users
                this.setState({ projects: [...this.state.projects, new_project] })
            }).catch(error => console.log(error))
    }

    deleteTODO(id) {
        const headers = this.get_headers()
        axios.delete(getUrl(`/api/todos/${ id }`), { headers })
            .then(response => {
                this.setState({ todos: this.state.todos.filter((item) => item.id !== id) })
            }).catch(error => console.log(error))
    }

    createTODO(project, text, user) {
        const headers = this.get_headers()
        const data = { project: project, text: text, user: user }
        axios.post(getUrl('/api/todos/'), data, { headers })
            .then(response => {
                let new_todo = response.data
                const project = this.state.projects.filter((item) => item.id === project.id)[0]
                const user = this.state.users.filter((item) => item.uuid === user.uuid)[0]
                new_todo.project = project
                new_todo.user = user
                this.setState({ todos: [...this.state.todos, new_todo] })
            }).catch(error => console.log(error))
    }

    setProjSearch(substr){
        this.setState({projSearch:substr})
    }

    componentDidMount(){
        this.get_token_from_storage();
   }

   render () {
       console.log("****************" + this.is_authenticated())
       return (
           <Router>
               <header>
                   <div>
                       <Navbar navbarItems={ this.state.navbarItems } setProjSearch={(substr)=>this.setProjSearch(substr)}/>
                       { this.is_authenticated() ?
                           <button
                               onClick={ () => this.logout() }
                               className="button is-dark"
                           >Logout</button> :
                           <Link
                               to='/login'
                               className="button is-primary"
                           >Login</Link> }
                   </div>
               </header>
               <main role="main" className="flex-shrink-0">
                      <div className="container">
                        <Switch>
                            <Route exact path={["/", "/users"]}>
                                <UserList users={this.state.users} />
                            </Route>  )

                            <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, repository, users)=>this.createProject(name, repository, users)}/>}  />
                            <Route exact path='/projects'>
                                <ProjectList items={this.state.projects} projectSubstr={this.state.projSearch} deleteProject={(id)=>this.deleteProject(id)}/>
                            </Route>

                            <Route exact path='/todos/create' component={() =>
                                <TodoForm
                                    users={this.state.users}
                                    projects={this.state.projects}
                                    createTodo={(project, text, user)=>this.createTODO(project, text, user)}
                                />}
                            />
                            <Route exact path='/todos'>
                                <TodoList items={this.state.todos} deleteTodo={(id)=>this.deleteTODO(id)}/>
                            </Route>

                            <Route exact path='/login'
                                   component={
                                       () => <LoginForm get_token={
                                                (username, password) => this.get_token(username, password)
                                            }/>
                                   }
                            />
                            <Route path="/project/:id"
                                   children={
                                <ProjectDetail

                                       getProject={(id) => this.getProject(id)}
                                       item={this.state.project}
                                /> }

                            />
                            <Route component={NotFound404} />
                        </Switch>

                        <FooterItem></FooterItem>

                      </div>
                  </main>
           </Router>

       )
   }
}

export default App;
