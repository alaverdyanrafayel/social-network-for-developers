import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';


class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors })
        }

        if(nextProps.profile.profile){
            const { profile } = nextProps.profile;

            // bring skills array to CSV

            const skillsCSV = profile.skills.join(',');

            // if profile field doesn't exist make an empty string
            
            profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

            // set component fields state

            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
        const { errors, displaySocialInputs } = this.state;
        let socialInputs;
        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup 
                        placeholder="Twitter profile URL"
                        icon="fab fa-twitter"
                        name="twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup 
                        placeholder="Facebook profile URL"
                        icon="fab fa-facebook"
                        name="facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup 
                        placeholder="Linkedin profile URL"
                        icon="fab fa-linkedin"
                        name="linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup 
                        placeholder="Youtube profile URL"
                        icon="fab fa-youtube"
                        name="youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup 
                        placeholder="Instagram profile URL"
                        icon="fab fa-instagram"
                        name="instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            )
        }
      const options = [
          { label: "* Select professional status", value: 0 },
          { label: "Developer", value: "Developer" },
          { label: "Junior Developer", value: "Junior Developer" },
          { label: "Senior Developer", value: "Senior Developer" },
          { label: "Manager", value: "Manager" },
          { label: "Student of learning", value: "Student of learning" },
          { label: "Intern", value: "Intern" },
          { label: "Other", value: "Other" }
      ]
    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to='dashboard' className='btn btn-light'>
                            Go Back
                        </Link>
                        <h1 className="display-4 text-center">Edit profile</h1>        
                        <small className="d-block pb-3">* = required</small>
                        <form onSubmit={this.onSubmit}>
                            <TextAreaFieldGroup 
                                placeholder="* Profile Handle"
                                name="handle"
                                onChange={this.onChange}
                                value={this.state.handle}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your full name company name nickname"
                            />
                            <SelectListGroup 
                                placeholder="* Status"
                                name="status"
                                onChange={this.onChange}
                                value={this.state.status}
                                error={errors.status}
                                options={options}
                                info="Give us an idea of where you are at in your career"
                            />
                            <TextAreaFieldGroup 
                                placeholder="Company"
                                name="company"
                                onChange={this.onChange}
                                value={this.state.company}
                                error={errors.company}
                                info="Could be your own company or one you work for"
                            />
                            <TextAreaFieldGroup 
                                placeholder="Website"
                                name="website"
                                onChange={this.onChange}
                                value={this.state.website}
                                error={errors.website}
                                info="Could be your own website or a company one"
                            />
                            <TextAreaFieldGroup 
                                placeholder="Location"
                                name="location"
                                onChange={this.onChange}
                                value={this.state.location}
                                error={errors.location}
                                info="City"
                            />
                            <TextAreaFieldGroup 
                                placeholder="* Skills"
                                name="skills"
                                onChange={this.onChange}
                                value={this.state.skills}
                                error={errors.skills}
                                info="Please use comma separated values"
                            />
                            <TextAreaFieldGroup 
                                placeholder="Github username"
                                name="githubusername"
                                onChange={this.onChange}
                                value={this.state.githubusername}
                                error={errors.githubusername}
                                info="If you want your latest repos and a github link, include your username"
                            />
                             <TextAreaFieldGroup 
                                placeholder="Short bio"
                                name="bio"
                                onChange={this.onChange}
                                value={this.state.bio}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />
                            <div className="mb-3">
                                <button 
                                    type="button"
                                    onClick={() => {
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs       
                                        }))
                                    }} 
                                    className="btn btn-light"
                                >
                                    Add social media links
                                </button>
                                <span className="text-muted">Optional</span>
                            </div>
                            {socialInputs}
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

EditProfile.prototypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
  })
  

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
