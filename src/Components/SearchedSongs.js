import React from "react";

class SearchedSongs extends React.Component {
  state = {
    clicked: false
  };

  clickHandler = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <img
            className="card-img-top cover-pic"
            src={this.props.track.image}
            alt=""
          />
          <h3 className="card-title">{this.props.track.name}</h3>
          <h4 className="card-text">{this.props.track.artists}</h4>
          

          <p>Preview:</p>
          {this.props.track.preview !== null ? (
            <audio ref="audio_tag" src={this.props.track.preview} controls />
          ) : (
            <p>No preview available</p>
          )}
        </div>
      </div>
    );
  }
}
export default SearchedSongs;
