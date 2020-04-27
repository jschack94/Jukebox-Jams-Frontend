import React from 'react';
import Popular from './Popular'

class PopTrack extends React.Component {


  render() {

    return(
      <div className="container">
      <h1>Top Tracks</h1>
        {this.props.topHits.map(track => (
          <Popular
            key={track.name}
            track={track}
            addToPlaylist={this.props.addToPlaylist}
            playlist={this.props.playlist}
          />
        ))}
      </div>
    )
  }
}
export default PopTrack;