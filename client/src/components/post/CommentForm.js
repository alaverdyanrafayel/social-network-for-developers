import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/postAction';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();

       const { user } = this.props.auth;
       const { postId } = this.props;

       const newData = {
           text: this.state.text,
           name: user.name,
           avatar: user.avatar
       }
       this.props.addComment(postId, newData);
       this.setState({text: ''});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

  render() {
      const { errors } = this.state;
    return (
        <div className="comment-form">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Write a comment...
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <TextAreaFieldGroup 
                                placeholder="Rely to post"
                                name="text"
                                value={this.state.text}
                                onChange={this.onChange}
                                error={errors.text}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

CommentForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default  connect(mapStateToProps, { addComment })(CommentForm);
