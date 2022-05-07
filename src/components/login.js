import Cookies from "js-cookie";
import React, { Component } from "react";
import configs from '../config'

// Login component
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : '',
            error : '',
            show_icon : false
        }
        this.login_user = this.login_user.bind(this)
    }

    // Handle input changes
    handleChange = ({ target: { name, value } }) => {
        this.setState({ ...this.state, [name]: value });
      };

    // Login button click
    login_user = async(e) => {
        e.preventDefault();

        this.state.show_icon = true
        if(this.state.email.length > 0 && this.state.password.length > 0) {

            // Call Login API
            const response = await fetch(configs.api_url + "/user/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({
                    email : this.state.email,
                    password : this.state.password
                })
            });

            const data = JSON.parse(await response.json());

            // When login is successful
            if(data.success === true) {
                console.log(data)
                Cookies.set("session_id", data.session_id)
                Cookies.set("user_name", data.user_name)
                this.props.onLoginButtonClick(data.user_name)
            }
            else
                this.setState({
                    email: '',
                    password: '',
                    error : data.data,
                    show_icon : false
                })
        }
        else {
            this.setState({
                error : "username and password cannot be empty",
                show_icon : false
            })
        }
    }

    render() {
        return (
            <>
            {this.state.show_icon && (<center><i className="fa fa-spinner fa-pulse fa-2x mt-5 center"></i></center>)}
            <div className="auth-wrapper background" >
                <div className="auth-inner">
                    <form onSubmit={this.login_user}>
                        <h3>Log In</h3>
                        <div className="form-group my-1">
                            <label className="my-2">Email ID</label>
                            <input type="text" name="email" className="form-control" placeholder="Enter email ID"
                             value={this.state.email} onChange={evt => this.handleChange(evt)}/>
                        </div>
                        <div className="form-group my-1">
                            <label className="my-2">Password</label>
                            <input type="password" name="password" className="form-control" placeholder="Enter password"
                            value={this.state.password} onChange={evt => this.handleChange(evt)}/>
                        </div>
                        <span className="alert-danger">{this.state.error}</span>
                        <button type="submit" className="btn btn-primary btn-block w-100 my-3">Log in</button>
                        <p><a href="/forget-password">forget password</a></p>
                    </form>
                </div>
            </div>
            </>
        );
    }
}