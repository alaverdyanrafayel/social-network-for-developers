import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
      const { postid, comments } = this.props;

    return comments.map(comment => 
        <CommentItem key={comment._id} postid={postid} comment={comment}/>)
  }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postid: PropTypes.string.isRequired
}

export default CommentFeed;
