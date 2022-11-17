import React, {useEffect, useState} from 'react';
import './CommentItem.scss'


const CommentItem = ({comments}) => {
  return (
    <div className='comment'>

      <h2 className='comment__title'>{comments.length>0 ? 'Comments: ': 'No comments.'}</h2>

      {comments.map(comment =>
        <div className='comment__content' key={comment.id}>
          <div className='comment__top'>
            <h4 className='comment__user'>{comment.user.name}</h4>
            <p className='comment__rating'>{comment.rating}</p>
          </div>
          <p className='comment__body'>{comment.comment}</p>
          <p className='comment__date'>{comment.date.slice(0,10)}</p>
        </div>
      )}
    </div>
  );
};

export default CommentItem;