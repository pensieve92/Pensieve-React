import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import logo from 'img/logo/icon-BLUE6.png'
import menu from 'img/menu.png'

const cx = classNames.bind(styles);

const Header = () => (
  <header className={cx('Header')} >
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <div className={cx('menu')}>
          <img className={cx('menu-icon')} src={menu} />
        </div>
        <div>
          <img className={cx('logo')} src={logo}/>        
          <Link to="/">Pensieve</Link>        
        </div>        
      </div>
      <div className={cx('right')}></div>
    </div>    
  </header>
);

export default Header;
