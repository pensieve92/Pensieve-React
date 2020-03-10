import React from 'react';
import styles from './Boarder.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Boarder = () => (
  <div className={cx('Boarder')} >
    Boarder
  </div>
);

export default Boarder;
