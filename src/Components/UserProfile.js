import React from 'react';

class UserProfile extends React.Component {

  state = {
    name: this.props.userInfo.name,
    username: this.props.userInfo.username,
    clicked: false,
    deleteClick: false
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  clickHandler = () => {
    let click = this.state.clicked
    this.setState({clicked: !click})
  }

  deleteClickHandler = () => {
    let clicked = this.state.deleteClick
    this.setState({deleteClick: !clicked})
  }


  render() {
    return(
      <div>
        <h1>Welcome Back {this.props.userInfo.name}</h1>
        <p>Name: {this.props.userInfo.name}</p>
        <p>Username: {this.props.userInfo.username}</p>
        <button type="button" className="btn btn-warning" onClick={this.clickHandler}>Edit User</button>
        {this.state.clicked ? (<form onSubmit={(e) => this.props.editSubmitHandler(e, this.state)}>
          <h4>Edit User</h4>
          <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} /><br/>
          <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} /><br/>
          <button type="button" value="Edit" className="btn btn-warning">Submit</button>
        </form>) : (null)}

        <button type="button" className="btn btn-danger" onClick={this.deleteClickHandler}>Delete User</button><br/><br/><hr/>
        {this.state.deleteClick ? (<button type="button" className="btn btn-danger" onClick={this.props.deleteUser}>Click if you are sure you want to delete</button>) : (null)}

      </div>
    )
  }
}
export default UserProfile;