import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor(){
    super()
      this.state = {
        name: '',
        email: '',
        password: '',
        password2: '',
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
  
  componentWillReceiveProps = nextProps => {
    if(nextProps.errors){
      this.setState({ errors: nextProps.errors })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history);
    
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.handleSubmit}>
              <TextFieldGroup 
                  error={errors.name}
                  name="name"
                  placeholder="Name" 
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <TextFieldGroup 
                  type="email"
                  error={errors.email}
                  name="email"
                  placeholder="Email Address" 
                  value={this.state.email}
                  onChange={this.handleChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup 
                  type="password"
                  error={errors.password}
                  name="password"
                  placeholder="Password" 
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <TextFieldGroup 
                  type="password"
                  error={errors.password2}
                  name="password2"
                  placeholder="Confirm Password" 
                  value={this.state.password2}
                  onChange={this.handleChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.prototypes = {
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
