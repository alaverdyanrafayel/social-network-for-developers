import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props){
        super(props)
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
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

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
            current: this.state.current
        }

        this.props.addEducation(eduData, this.props.history)
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
        <div className='add-education'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <Link to='dashboard' className='btn btn-light'>
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Add Experience</h1>        
                        <p className="lead text-center">
                           Add any education you have had in the past or you have current 
                        </p>
                        <small className="d-block pb-3">* = required fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeholder="* School"
                                name="school"
                                onChange={this.onChange}
                                value={this.state.school}
                                error={errors.school}
                            />
                            <TextFieldGroup 
                                placeholder="* Degree"
                                name="degree"
                                onChange={this.onChange}
                                value={this.state.degree}
                                error={errors.degree}
                            />
                            <TextFieldGroup 
                                placeholder="* Field of study"
                                name="fieldofstudy"
                                onChange={this.onChange}
                                value={this.state.fieldofstudy}
                                error={errors.fieldofstudy}
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
                                    Current Education
                                </label>
                            </div>
                            <TextAreaFieldGroup 
                                placeholder="Education Description"
                                name="description"
                                onChange={this.onChange}
                                value={this.state.description}
                                error={errors.description}
                                info="Tell us about the degree"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object,
    addEducation: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
