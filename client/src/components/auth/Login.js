import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(){
    super()
      this.state = {
        email: '',
        errors: {}
      }
  }

  handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push("/dashboard");
    }

    if(nextProps.errors){
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(newUser);
  }
  render() {
    const { errors } = this.props;
    return (
        <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup 
                  type="email"
                  error={errors.email}
                  name="email"
                  placeholder="Email Address" 
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <TextFieldGroup 
                  type="password"
                  error={errors.password}
                  name="password"
                  placeholder="Password Address" 
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
                {errors.msg && (
                  <span style={{ color: 'red' }}>{errors.msg}</span>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.prototypes = {
  auth: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
