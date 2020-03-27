import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {Link} from 'react-router-dom'

const Sidebar = props => {

  return (
    <Menu>

    {props.login ? (
      <div className="sideBar">

      <Link to={"/home"} >
        <p className="menu-item">Home</p>
      </Link>

    
      <Link to={"/playlist"} >
        <p className="menu-item">My Playlists</p>
      </Link>


      <Link to={"/spotify"} >
      <p className="menu-item">Connect to Spotify</p>
    </Link>

      <Link to={"/popular"} >
        <p className="menu-item">Top Tracks</p>
      </Link>

      <Link to={"/random"} >
        <p className="menu-item">Random Tracks</p>
      </Link>

      
      <Link to={"/surprise"} >
        <p className="menu-item">Surprise Track</p>
      </Link>

      <Link to={"/aboutme"} >
        <p className="menu-item">About Me</p>
      </Link>

      <Link to={"/profile"} >
        <p className="menu-item">My Profile</p>
      </Link>



      <Link to={"/home"} >
      <p className="menu-item" onClick={props.logout}>Logout</p>
    </Link>

    </div>
  ) : (
    <div className="sideBar">
      <Link to={"/home"} >
        <p className="menu-item">Home</p>
      </Link>

      <Link to={"/login"} >
        <p className="menu-item">Login</p>
      </Link>

      <Link to={"/signup"} >
        <p className="menu-item">Signup</p>
      </Link>
    </div>
    )}

    </Menu>

  );
};
export default Sidebar;