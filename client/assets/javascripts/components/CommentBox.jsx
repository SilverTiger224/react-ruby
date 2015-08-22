import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentBox = React.createClass({
  displayName: 'CommentBox',

  propTypes: {
    pollInterval: React.PropTypes.number.isRequired,
    actions: React.PropTypes.object.isRequired,
  },

  componentDidMount() {
    let fetchComments = this.props.actions.fetchComments;
    fetchComments();
    setInterval(fetchComments,
      this.props.pollInterval);
  },

  render() {
    const { actions, data } = this.props;

    return (
      <div className='commentBox container'>
        <h1>Comments { this.props.ajaxCounter > 0 ? `SENDING AJAX REQUEST! Ajax Counter is ${this.props.ajaxCounter}` : '' }</h1>
        <p>Text take Github Flavored Markdown. Comments older than 24 hours are deleted.</p>
        <CommentForm ajaxSending={this.props.ajaxCounter > 0} actions={actions} error={data.get('submitCommentError')}/>
        <CommentList comments={data.get('comments')} error={data.get('fetchCommentError')}/>
      </div>
    );
  },
});

export default CommentBox;
