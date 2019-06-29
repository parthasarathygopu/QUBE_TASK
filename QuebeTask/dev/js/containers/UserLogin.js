import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogging } from '../actions/index';
import { Link } from 'react-router-dom';
import { Header } from './header';
import './style.css';
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUser: {}
        };
    }
    onChangeHandler(event) {
        const loginUser = this.state.loginUser;
        const name = event.target.name;
        const value = event.target.value;
        loginUser[name] = value;
        if (!isNaN(value) && value.length <= 10) {
            this.setState({ loginUser });
        }
       
    }

    onKeyPress(event) {
        if (isNaN(event.key) || (event.key && event.key.trim() === '')) {
            event.preventDefault();
        }
    }

    render() {
        const disableLogin = this.state.loginUser.phone || this.state.loginUser.name;
        return (
            <div>
                <Header />
                <form>
                    <h1 className="marginLogin">LOGIN </h1>
                    <p className="marginPhone">Phone Number :<input className="phoneInput" type="text" maxLength="10" value={this.state.loginUser.phone}
                       placeholder="Enter your phone number...!" name="phone" onChange={this.onChangeHandler.bind(this)} onKeyPress={this.onKeyPress.bind(this)}></input></p>
                    <p className="marginName">Name : <input className="nameInput" type="text" name="name"
                       placeholder="Enter your name...!"
                        onChange={this.onChangeHandler.bind(this)} ></input></p>
                    <Link to="/item-List"> <button className="marginLoginBtn" type="button" disabled={!disableLogin}
                        onClick={this.props.userLogging.bind(this, this.state.loginUser)}>Login</button></Link>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.users
    };
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ userLogging: userLogging }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Login);
