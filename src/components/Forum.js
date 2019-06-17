import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Forum extends React.Component{

    componentWillMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }
    render() {
        return<div style={{fontSize:'60px', marginTop:'2%'}}>You're Logged in</div>
    }
}

Forum.propTypes = {
    
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
})


export default connect(mapStateToProps)(Forum);