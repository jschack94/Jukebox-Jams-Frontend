import React from 'react';
import Random from './Random'

class RandomTrack extends React.Component {

  render() {
    return(
      <div className="container">
      <h1>Random Songs</h1>
        {this.props.random.map(track => (
          <Random
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
export default RandomTrack;