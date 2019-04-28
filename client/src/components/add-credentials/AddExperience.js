import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
    constructor(props){
        super(props)
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
            current: this.state.current
        }

        this.props.addExperience(expData, this.props.history)
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }

  render() {
      const { errors } = this.state;

    return (
        <div className='add-experience'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <Link to='dashboard' className='btn btn-light'>
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Experience</h1>        
                        <p className="lead text-center">
                           Add any job or position you have had in the past or you have current 
                        </p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeholder="* Company"
                                name="company"
                                onChange={this.onChange}
                                value={this.state.company}
                                error={errors.company}
                            />
                            <TextFieldGroup 
                                placeholder="* Job Title"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.title}
                                error={errors.title}
                            />
                            <TextFieldGroup 
                                placeholder="Location"
                                name="location"
                                onChange={this.onChange}
                                value={this.state.location}
                                error={errors.location}
                            />
                            <h1>From Date</h1>
                            <TextFieldGroup 
                                name="from"
                                type="date"
                                onChange={this.onChange}
                                value={this.state.from}
                                error={errors.from}
                            />
                            <h1>To Date</h1>
                            <TextFieldGroup 
                                name="to"
                                type="date"
                                onChange={this.onChange}
                                value={this.state.to}
                                error={errors.to}
                                disabled={this.state.disabled ? 'disabled' : ''}
                            />
                            <div className="form-check mb-4">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                />
                                <label htmlFor="current" className='form-check-label'>
                                    Current Job
                                </label>
                            </div>
                            <TextAreaFieldGroup 
                                placeholder="Job Description"
                                name="description"
                                onChange={this.onChange}
                                value={this.state.description}
                                error={errors.description}
                                info="Tell us about the position"
                            />
                            <input 
                                type="submit"
                                value="Submit" 
                                className="btn btn-info btn-block mt-4"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object,
    addExperience: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
