import React from 'react';
import { Link } from 'react-router-dom';

// Header component
class Header extends React.Component
{
    constructor(props) {
        super(props);
        this.HandleButtonClick = this.HandleButtonClick.bind(this)
    }

    // Handle On clicking nav links
    HandleButtonClick(show_component) {
        this.props.onNavButtonClick(show_component)
    }

    render()
    {
      return (
          <nav className="navbar sticky  navbar-expand-lg navbar-light bg-light" style={{"position" : "fixed"}}>
          <div className="container px-4 px-lg-5">
              <Link className="navbar-brand" to={'/home'}>Online Book Store</Link>

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{"margin-left" : "50%"}}>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">

                      <li className="nav-item"><a className="nav-link" onClick={() => this.HandleButtonClick("home")} value="home">Home</a></li>

                      {(this.props.username.length==0) && (
                      <><li className="nav-item"><a className="nav-link" onClick={() => this.HandleButtonClick("login")} value="login">Login</a></li>
                      <li className="nav-item"><a className="nav-link" onClick={() => this.HandleButtonClick("signup")} value="signup">Signup</a></li></>)}

                      {(this.props.username.length>0) && (
                      <><li className="nav-item"><a className="nav-link" onClick={() => this.HandleButtonClick("logout")} value="logout">Logout</a></li></>)}

                      {(this.props.username.length>0) && (
                      <><li className="nav-item"><a className="nav-link" onClick={() => this.HandleButtonClick("history")} value="history">History</a></li></>)}

                      <li className="nav-item"><a className="nav-link" onClick={() => this.HandleButtonClick("cart")} value="cart">Cart</a></li>
                      <li className="nav-item"><p className="nav-link" value="cart">Items in cart : {this.props.product_count}</p></li>

                  </ul>
              </div>
          </div>
        </nav>
      )
    }
}

export default Header;