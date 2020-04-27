import React from 'react';
import Surprise from './Surprise'

class SurpriseTrack extends React.Component {


  render() {

    return(
      <div className="container">
      <h1>Surprise Track</h1>
        {this.props.surprise.map(track => (
          <Surprise
            key={track.name}
            track={track}
          />
        ))}
      </div>
    )
  }
}
export default SurpriseTrack;