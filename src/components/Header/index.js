import React from 'react';
import logo from '../../assets/images/logo-qualicorp.png';
import './styles.scss';

export default function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="Qualicorp" />
    </header>
  )
}
