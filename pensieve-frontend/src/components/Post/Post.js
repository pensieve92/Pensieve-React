import React from 'react';
import styles from './Post.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Post = () => (
  <div className={cx('Post')} >
    Post
  </div>
);

export default Post;
