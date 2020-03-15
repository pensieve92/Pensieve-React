import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Header from 'components/common/Header';


const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
  <div className={cx('PageTemplate')} >
    <Header />
    <main>
      {children}
    </main>    
  </div>
);

export default PageTemplate;
