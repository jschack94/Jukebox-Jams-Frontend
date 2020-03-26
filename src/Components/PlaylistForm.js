import React from 'react';


class PlaylistForm extends React.Component {

  state = {
    name: "",
    userId: "",
    clicked: false
  }

  changeHandler = (e) => {
    let userId = this.props.userInfo.id
    this.setState({
      name: e.target.value,
      userId: userId
    })
  }

  clickHandler = () => {
    let click = this.state.clicked
    this.setState({
      clicked: !click
    })
  }

//this.state
  render() {
    //console.log(this.props)
    return(
      <div>
      <button type="button" className="btn btn-primary" onClick={this.clickHandler}>Create New Playlist </button>

      {this.state.clicked ? (
        <form className="form-group" onSubmit={(event) => this.props.createNewPlaylist(event, this.state)}>

        <input type="text" placeholder="Playlist Name" onChange={this.changeHandler} value={this.state.playlistName} />
        <input type="hidden" value={this.state.userId} />
        <input type="submit" value="Submit" className="btn btn-success"/>
      </form>
    ) : (null)
  }
      </div>
    )
  }
}
export default PlaylistForm;