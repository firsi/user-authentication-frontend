import React from 'react';
import './navbar.css';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
class  Navbar extends React.Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render(){    

        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            
            <ul className="navbar-nav ml-auto">
                <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            Logout
                </a>
            </ul>
        
        );

        const guestLinks = (<span></span>);
        var brandColor = (this.props.location.pathname === '/register') ?  "white-brand" : "";
               
           
        return <nav className="navbar navbar-expand fixed-top">
                <a className ={"navbar-brand "+brandColor} href="/forum">Redux auth</a>

                {isAuthenticated ? authLinks : guestLinks}

        </nav>
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));