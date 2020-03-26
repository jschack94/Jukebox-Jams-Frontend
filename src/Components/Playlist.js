import React from 'react';
import PlaylistForm from './PlaylistForm'



class Playlist extends React.Component {



  render() {

    return(
      
      <div>
      <h1>My Playlists</h1>
      <PlaylistForm
        userInfo={this.props.userInfo}
        createNewPlaylist={this.props.createNewPlaylist}
      />
      <br />

    

      </div>

    )
  }
}
export default Playlist;