import React from 'react';
import AddToPlaylistForm from './AddToPlaylistForm'


class SearchedSongs extends React.Component {
  state={
    clicked: false
  }

  clickHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }
  render(){
    return(
      <div className="card">
        <div className="card-body">
        <img className="card-img-top cover-pic" src={this.props.track.image} alt="" />
        <h3 className="card-title">{this.props.track.name}</h3>
        <h4 className="card-text">{this.props.track.artists}</h4>
        <button onClick={this.clickHandler} type="button" className="btn btn-info">Add to My Playlist</button>
        {this.state.clicked ? (<AddToPlaylistForm playlist={this.props.playlist} track={this.props.track} addToPlaylist={this.props.addToPlaylist}/>) : (null)}
        
        <p>Preview:</p>
        {this.props.track.preview !== null ?
          <audio
            ref="audio_tag"
            src={this.props.track.preview}
            controls
          /> :
            <p>No preview available</p>
        }
        </div>
      </div>
    )
  }
}
export default SearchedSongs;