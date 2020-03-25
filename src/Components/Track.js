import React from 'react'

class Track extends React.Component {

  render() {
    return (
      <div> {this.props.topHits.map(song => {
        return (<h4>{song.name}</h4>)
      })}</div>
    )
  }
}

export default Track;