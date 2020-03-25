import React from 'react';

class NewUserForm extends React.Component {
  state={
    name: "",
    username: "",
    password: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  render() {
    return(
      <form className="new-user-form" onSubmit={(e) => this.props.newUserSubmitHandler(e, this.state)}>
        <h2>Make a New User:</h2>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.changeHandler} />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="username" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.changeHandler} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}
export default NewUserForm;