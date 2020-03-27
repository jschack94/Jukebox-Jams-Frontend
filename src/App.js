import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import NewUserForm from "./Components/NewUserForm";
import Login from "./Components/Login";
import PopTrack from "./Components/PopTrack";
import RandomTrack from "./Components/RandomTrack";
import UserProfile from "./Components/UserProfile";
import Home from "./Components/Home";
import Loading from "./Components/Loading";
import FullContainer from "./Containers/FullContainer";
import Playlist from "./Components/Playlist";
import SurpriseTrack from "./Components/SurpriseTrack";
import About from "./Components/About";

import "./App.css";

class App extends Component {
  _isMounted = false;

  state = {
    topHits: [],
    random: [],
    isLoading: true,
    user: {},
    playlist: [],
    login: false,
    searchedSongs: [],
    loading: false,
    playlistTracks: [],
    surprise: []
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({ isLoading: false });
    }
  }

  getTopHits() {
    //change address depending on port
    fetch("http://localhost:3000/api/v1/tracks/top_100", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            topHits: data
          });
        }
      });
  }

  getRandom() {
    //change address depending on port
    fetch("http://localhost:3000/api/v1/tracks/random", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            random: data
          });
        }
      });
  }

  getSurprise() {
    //change address depending on port
    fetch("http://localhost:3000/api/v1/tracks/surprise", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            surprise: data
          });
        }
      });
  }

  loginSubmitHandler = (userInfo) => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Action: "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        this.setState({
          user: data.user,
          login: true
        });
        this.props.history.push("/home");
        this.getRandom();
        this.getTopHits();
        this.getSurprise();
      });
  };

  //STILL NEEDS WORK
  createNewPlaylist = (e, playlist) => {
    e.preventDefault();
    //console.log(playlist)
    fetch(`http://localhost:3001/api/v1/users/${playlist.userId}/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: playlist.name,
        user_id: playlist.userId
      })
    })
      .then((res) => res.json())
      .then((data) => {
        let playlist = [...this.state.playlist, data];
        this.setState({
          playlist
        });
      })
      .then(alert(`${playlist.name} created!`));
  };

  newUserSubmitHandler = (event, userInfo) => {
    event.preventDefault();
    localStorage.getItem("token");
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: userInfo.name,
        username: userInfo.username,
        password: userInfo.password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        this.setState({
          user: data.user,
          login: true
        });

        this.props.history.push("/home");
        this.getRandom();
        this.getTopHits();
        this.getSurprise();
      });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      user: {},
      login: false
    });
    this.props.history.push("/home");
  };

  editSubmitHandler = (e, userInfo) => {
    e.preventDefault();
    let id = this.state.user.id;
    console.log(id);
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: userInfo.name,
        username: userInfo.username,
        password: this.state.user.password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          user: data.user
        });
        console.log(data.user);
      });
  };

  submitPlaylistHandler = (e, playlistId, track, spotifyId) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/playlist_tracks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        playlist_id: playlistId,
        track_id: track.id,
        spotify_id: spotifyId
      })
    })
      .then((res) => res.json())
      .then((data) => {
        let fullPlaylist = [...this.state.playlistTracks, data];
        let newTrack = {
          id: data.track_id,
          name: track.name,
          artists: track.artists,
          image: track.image,
          duration: track.duration,
          popularity: track.popularity,
          preview: track.preview,
          spotify_id: track.spotify_id
        };
        this.setState({
          playlistTracks: fullPlaylist,
          tracks: [...this.state.tracks, newTrack]
        });
      })
      .then(alert(`${track.name} added!`));
  };

  deleteUser = () => {
    let id = this.state.user.id;
    fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(this.logout());
  };

  fetchSearchedSongs = (query) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/v1/tracks/search?q=${query}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((r) => r.json())
      .then((data) => {
        this.setState({
          searchedSongs: data,
          loading: false
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Sidebar login={this.state.login} logout={this.logout} />
        <Switch>
          <Route
            path="/playlist"
            render={() => (
              <Playlist
                userInfo={this.state.user}
                createNewPlaylist={this.createNewPlaylist}
                playlist={this.state.playlist}
                removeSong={this.removeSong}
                tracks={this.state.tracks}
              />
            )}
          />

          <Route
            path="/popular"
            render={() =>
              this.state.topHits.length === 0 ? (
                <Loading />
              ) : (
                <PopTrack
                  topHits={this.state.topHits}
                  addToPlaylist={this.submitPlaylistHandler}
                  playlist={this.state.playlist}
                />
              )
            }
          />

          <Route
            path="/random"
            render={() =>
              this.state.random.length === 0 ? (
                <Loading />
              ) : (
                <RandomTrack
                  random={this.state.random}
                  addToPlaylist={this.submitPlaylistHandler}
                  playlist={this.state.playlist}
                />
              )
            }
          />

          <Route
            path="/surprise"
            render={() =>
              this.state.surprise.length === 0 ? (
                <Loading />
              ) : (
                <SurpriseTrack surprise={this.state.surprise} />
              )
            }
          />

          <Route
            path="/profile"
            render={() => (
              <UserProfile
                userInfo={this.state.user}
                editSubmitHandler={this.editSubmitHandler}
                deleteUser={this.deleteUser}
              />
            )}
          />

          <Route
            path="/signup"
            render={() => (
              <NewUserForm newUserSubmitHandler={this.newUserSubmitHandler} />
            )}
          />

          <Route
            path="/login"
            render={() => (
              <Login
                loginSubmitHandler={this.loginSubmitHandler}
                userInfo={this.state.user}
              />
            )}
          />

          <Route
            path="/home"
            render={() => (
              <Home
                fetchSearchedSongs={this.fetchSearchedSongs}
                searchedSongs={this.state.searchedSongs}
                login={this.state.login}
                loading={this.state.loading}
                addToPlaylist={this.submitPlaylistHandler}
                playlist={this.state.playlist}
              />
            )}
          />

          <Route path="/aboutme" component={About} />

          <Route path="/spotify" component={FullContainer} />

          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
