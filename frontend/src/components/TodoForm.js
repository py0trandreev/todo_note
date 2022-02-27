import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
          project: 0,
          text: '',
          user:0,
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
      console.log(`l27:handleSubmit(event)/this.state.project- ${this.state.project}`)
      console.log(`l28:handleSubmit(event)/this.state.text- ${this.state.text}`)
      console.log(`l29:handleSubmit(event)/this.state.user- ${this.state.user}` )

      this.props.createTodo(this.state.project, this.state.text, this.state.user)
      event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={ (event) => this.handleSubmit(event) }>
                <div className="field">
                    <div className="form-group">
                        <label for="project">project</label>
                        <div className="control">
                            <select name="project" className='form-control input is-info'
                                    onChange={ (event) => this.handleChange(event) }>
                                { this.props.projects.map((item) => <option value={ item.id }>{ item.name }</option>) }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="form-group">
                        <label for="text">text</label>
                        <div className="control">
                            <input type="text" className="form-control input is-info" name="text" value={ this.state.text }
                                   onChange={ (event) => this.handleChange(event) }/>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <div className="form-group">
                        <label For="user">user</label>
                        <div className="control">
                            <select name="user" className='form-control input is-info'
                                    onChange={ (event) => this.handleChange(event) }>
                                { this.props.users.map((item) => <option
                                    value={ item.uuid }>{ item.username }</option>) }
                            </select>
                        </div>
                    </div>
                </div>

                <input type="submit" className="button is-success" value="Save"/>
            </form>
        );
    }
  }

  export default TodoForm