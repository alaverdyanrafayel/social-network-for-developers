import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {

    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getPost(id);
    }

  render() {

    const { post, loading } = this.props.post;
    let postContent;

    if(post === null || loading || Object.keys(post).length === 0){
        postContent = <Spinner />;
    } else {
        postContent = (
            <div>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
            </div>
        )
    }

    return (
        <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/feed" className="btn btn-light">
                            Back to Feed
                        </Link>
                        { postContent }
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToprops = state => ({
    post: state.post
})

export default connect(mapStateToprops, { getPost })(Post);
