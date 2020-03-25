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

      <Link to={"/profile"} >
        <p className="menu-item">My Profile</p>
      </Link>

      <Link to={"/popular"} >
        <p className="menu-item">Top Hits</p>
      </Link>

      <Link to={"/random"} >
        <p className="menu-item">Random Songs</p>
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