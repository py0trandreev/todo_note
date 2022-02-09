import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          name: '',
          repository: '',
          users:[],
      }
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value

                }
            );
    }

    handleSelected(event)
    {
        this.setState(
                {
                     users: [...event.target.selectedOptions].map(opt=>opt.value)
                }
            );
    }

    handleSubmit(event) {
      console.log(this.state.name)
      console.log(this.state.repository)
      console.log(this.state.users)

      this.props.createProject(this.state.name, this.state.repository, this.state.users)
      event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={ (event) => this.handleSubmit(event) }>
                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name" value={ this.state.name }
                           onChange={ (event) => this.handleChange(event) }/>
                </div>

                <div className="form-group">
                    <label for="repository">repository</label>
                    <input type="text" className="form-control" name="repository" value={ this.state.repository }
                           onChange={ (event) => this.handleChange(event) }/>
                </div>

                <div className="form-group" >
                    <label for="users">users</label>
                    <div className="select is-multiple">
                        <select className="form-control"
                                name="users" id="users"
                                onChange={ (event) => this.handleSelected(event) }
                                multiple>
                            { console.log("****************999**********************" + JSON.stringify(this.props.users)) }
                            { this.props.users.map((item) => <option value={ item.uuid }>{ item.username }</option>) }
                        </select>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
  }

  export default ProjectForm