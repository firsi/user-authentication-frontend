import React from 'react';
import './register-login.css';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';



class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errors:{},
            changePage:false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
           [e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            
            email: this.state.email,
            password: this.state.password,
            
        }
        this.props.loginUser(user);
    }

    handlePageChange(){
        this.setState({changePage: true})
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/forum');
        }
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {errors} = this.state;
       
        return (isAuthenticated) ? <Redirect to='/forum'/> : <div className="container-fluid">
                <div className="row">
                   
                    <div className="col-lg-8 col-md-8 col-12">
                        <main className="text-center">
                            <h1 >Login To Your Account</h1>
                            <p> Use your email for registration</p>
                            <form  onSubmit={this.handleSubmit}>
                                
                                <input type="email" 
                                 className={classnames('form-control ', {
                        'is-invalid': errors.email
                    })}
                                placeholder="E-mail"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}

                                />
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}

                                <input type="password" 
                                 className={classnames('form-control ', {
                        'is-invalid': errors.password
                    })}
                                placeholder="Password"
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}

                                />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                <button className="btn btn-primary" type="submit">Sign in </button>

                            </form>
                        </main>
                    </div>

                    <div className="col-lg-4 col-md-4 col-12">
                      <aside className ="side-text-container">
                        <h1>New Here</h1>
                        <p> Sign up and discover a great amount of of awesome ressources!</p>
                       <Link  to='/register' className="router-link" onClick={this.handlePageChange}>Sign up</Link>
                      </aside>
                        
                    </div>
                </div>
        </div>
    }
}

Login.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export  default connect(mapStateToProps, { loginUser })(Login)