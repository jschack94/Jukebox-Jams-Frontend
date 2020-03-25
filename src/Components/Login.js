import React from 'react';

class Login extends React.Component {

  state={
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
      <form className="new-user-form" onSubmit={this.loginSubmitHandler.bind(this)}>

        <h2>Login:</h2>
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

  loginSubmitHandler(e){
    e.preventDefault()
    this.props.loginSubmitHandler(this.state)
    this.setState({username:"", password:""})
  }
}
export default Login;