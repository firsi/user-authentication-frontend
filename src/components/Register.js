import React from 'react';
import './register-login.css';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../actions/authentication';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirm:"",
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
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history);
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

            const {errors} = this.state;

        return <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-12">
                      <aside className ="side-text-container">
                        <h1>Welcome Back</h1>
                        <p> If you already have an account, then just sign in, we've missed you</p>
                         <Link to='/' className="router-link" onClick={this.handlePageChange}>Sign in</Link>
                      </aside>
                        
                    </div>

                    <div className="col-lg-8 col-md-8 col-12">
                        <main className="text-center">
                            <h1 >Create Account</h1>
                            <p> Use your email for registration</p>
                            <form  onSubmit={this.handleSubmit}>
                                <input type="text" 
                                className={classnames('form-control', {
                        'is-invalid': errors.name
                    })}
                                placeholder="Name"
                                name="name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                                />
                        {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                                <input type="email" 
                                className={classnames('form-control', {
                        'is-invalid': errors.email
                    })}
                                placeholder="E-mail"
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}

                                />
                            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                <input type="password" 
                                className={classnames('form-control', {
                        'is-invalid': errors.password
                    })}
                                placeholder="Password"
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}

                                />
                            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                <input type="password" 
                                className={classnames('form-control', {
                        'is-invalid': errors.password_confirm
                    })}
                                placeholder="Confirm your  password"
                                name="password_confirm"
                                onChange={this.handleInputChange}
                                value={this.state.password_confirm}

                                />
                        {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                                <button className="btn btn-primary" type="submit">Register </button>

                            </form>
                        </main>
                    </div>
                </div>
        </div>
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));