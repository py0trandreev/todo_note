import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          name: '',
          repository: '',
          users:0,
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

    handleSubmit(event) {
      console.log(this.state.name)
      console.log(this.state.repository)
      console.log(this.state.users)
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

                <div className="form-group">
                    <label for="users">users</label>
                    <input type="number" className="form-control" name="users" value={ this.state.users }
                           onChange={ (event) => this.handleChange(event) }/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
  }

  export default ProjectForm