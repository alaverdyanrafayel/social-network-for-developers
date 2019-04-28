import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick = () => {
      this.props.deleteProfile();
    }

  render() {
      const { user } = this.props.auth;
      const { profile, loading } = this.props.profile;
      let dashboardContent;

      if(profile === null || loading){
        dashboardContent = <Spinner />
      } else {
        if(Object.keys(profile).length > 0){
          dashboardContent = (
            <div>
              <p className="lead text-muted">
                Welcome <Link to={profile.handle}>{ user.name }</Link>
              </p>
              <ProfileActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div style={{ marginBottom: '60px' }}>
                <button onClick={this.onDeleteClick} className="btn btn-danger">Delete my account</button>
              </div>
            </div>
          )
        } else {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome { user.name }</p>
              <p>You haven't set up a profile yet, please add some info.</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          )
        }
      }

    return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Dashboard.prototypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired
  }
  
    const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });
  

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(Dashboard);
