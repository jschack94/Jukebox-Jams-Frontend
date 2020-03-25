import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import NewUserForm from './Components/NewUserForm';
import Login from './Components/Login';
import PopTrack from './Components/PopTrack';
import RandomTrack from './Components/RandomTrack';
import UserProfile from './Components/UserProfile';
import Home from './Components/Home';
import Loading from './Components/Loading'
import FullContainer from './Containers/FullContainer';




class App extends Component {
  _isMounted = false;
 
  state={
    topHits: [],
    userList: [],
    random: [],
    isLoading: true,
    user: {},
    login: false,
    searchedSongs: [],
    loading: false,
    tracks: []
    
    
  }


  componentDidMount(){
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({isLoading: false})
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  getTopHits(){
    //change address depending on port
    fetch('http://localhost:3000/api/v1/tracks/top_100', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res=>res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            topHits: data
          })
        }
      })
  }

  getRandom(){
    //change address depending on port
    fetch('http://localhost:3000/api/v1/tracks/random', {
      headers: {
        Authorization: localStorage.getItem("token")}
      })
      .then(res=>res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            random: data
          })
        }
        })
  }

  getUserList(){
    fetch('http://localhost:3000/api/v1/users')
      .then(res=>res.json())
      .then(data=> {
        this.setState({
          userList: data
        })
      })
  }

  getTracks = () => {
    fetch('http://localhost:3000/api/v1/tracks', {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => res.json())
    .then(data => {
      this.setState({
        tracks: data
      })
    })
  }

  loginSubmitHandler = (userInfo) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Action: "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    }).then(res=>res.json())
      .then(data => {
        localStorage.setItem("token", data.jwt)
        this.setState({
          user: data.user,
          login: true
        })
        this.props.history.push("/home")
        this.getRandom()
        this.getTopHits()
        this.getTracks()
      
      })
  }


    newUserSubmitHandler = (event, userInfo) => {
      event.preventDefault()
      localStorage.getItem("token")
      fetch('http://localhost:3000/api/v1/users', {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
       },
       body: JSON.stringify({
         name: userInfo.name,
         username: userInfo.username,
         password: userInfo.password,
       })
     }).then(res=>res.json())
        .then(data=>{
          localStorage.setItem("token", data.jwt)
          this.setState({
            user: data.user,
            login: true
          })
          this.props.history.push("/home")
          this.getRandom()
          this.getTopHits()
          this.getTracks()
          
        })

    }

    logout = () => {
      localStorage.removeItem("token")
      this.setState({
        user: {},
        login: false
      })
      this.props.history.push("/home")
    }




    editSubmitHandler = (e, userInfo) => {
      e.preventDefault()
      let id = this.state.user.id
      console.log(id);
      fetch(`http://localhost:3000/api/v1/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          name: userInfo.name,
          username: userInfo.username
        })
      })
    }

    deleteUser = () => {
      let id = this.state.user.id
        fetch(`http://localhost:3000/api/v1/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }).then(this.logout())
    }

    fetchSearchedSongs = (query) => {
      this.setState({loading: true})
      fetch(`http://localhost:3000/api/v1/tracks/search?q=${query}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(r => r.json())
      .then(data => {
        this.setState({
          searchedSongs: data,
          loading: false
        })
      })
    }

    
    

  render() {
    return (
      <div className="App">
      <Sidebar
        login={this.state.login}
        logout={this.logout}
        />
      <Switch>

        <Route
          path="/popular"
          render={()=> (
            this.state.topHits.length === 0?
            <Loading /> :
            <PopTrack
              topHits={this.state.topHits}
              
              />
            )}
            />

        <Route
          path="/random"
          render={()=> (
            this.state.random.length === 0?
              <Loading /> :
              <RandomTrack
                random={this.state.random}
            
                />
            )}
            />

        <Route
          path="/profile"
          render={()=>(
            <UserProfile
              userInfo={this.state.user}
              editSubmitHandler={this.editSubmitHandler}
              deleteUser={this.deleteUser}
             />
          )}
          />

        <Route
          path="/signup"
          render={()=>(
            <NewUserForm
              newUserSubmitHandler={this.newUserSubmitHandler}
              />
          )}
        />

        <Route
          path="/login"
          render={()=> (
            <Login
              loginSubmitHandler={this.loginSubmitHandler}
              userInfo={this.state.user}
              />
            )}
            />

        <Route
          path="/home"
          render={()=> (
            <Home
              fetchSearchedSongs={this.fetchSearchedSongs}
              searchedSongs={this.state.searchedSongs}
              login={this.state.login}
              loading={this.state.loading}
          
            />
          )}
          />

        <Route
          path="/"
          component={Home}
          />

      </Switch>
      
      < FullContainer/>
     
      </div>
    );
  }
}

export default withRouter(App);