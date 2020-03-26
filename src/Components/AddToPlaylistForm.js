import React from 'react';
import { Button } from 'reactstrap';

class AddToPlaylist extends React.Component {

  state = {
    selectedFilter: "",
  }

  changeHandler = (e) => {
    this.setState({
      selectedFilter: e.target.value
    })
  }


  render() {
    return(
      <form>
        <select name="type" id="type" onChange={this.changeHandler}>
        <option>Select a list</option>
        {this.props.playlist.map(pl => (
          <option value={pl.id}>{pl.name}</option>
        ))}
        </select>

        <Button
          onClick={(e) => this.props.addToPlaylist(e, this.state.selectedFilter, this.props.track, this.props.track.spotify_id)}
          color="primary">Add Song</Button>
      </form>
    )
  }
}
export default AddToPlaylist;