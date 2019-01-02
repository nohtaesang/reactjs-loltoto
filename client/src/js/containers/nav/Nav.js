import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './nav.css';
import * as userAction from '../../modules/user';
import Login from './Login';
import Logout from './Logout';

class Nav extends Component {
	constructor() {
		super();
	}

	componentWillMount() {
		const { UserAction, token } = this.props;
		const naver_id_login = new window.naver_id_login('WyI9Zt0DgUshOZRrcaaL', encodeURI('http://54.81.41.223:3000'));

		if (localStorage.token) {
			UserAction.setToken(naver_id_login.oauthParams.access_token);
		} else if (naver_id_login.oauthParams.access_token && token === null) {
			localStorage.setItem('token', naver_id_login.oauthParams.access_token);
			UserAction.setToken(naver_id_login.oauthParams.access_token);
			window.location.href = 'http://54.81.41.223:3000/';
		}
	}

	// componentDidMount() {}

	render() {
		const { token } = this.props;
		return <div id="nav">{token === null ? <Login /> : <Logout />}</div>;
	}
}

export default connect(
	state => ({
		token: state.user.token
	}),
	dispatch => ({ UserAction: bindActionCreators(userAction, dispatch) })
)(Nav);
