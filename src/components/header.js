import React from 'react'
import { Link } from 'gatsby'
import styles from './header.module.scss';

const HeaderLink = props => (
	<Link className={styles.link} to={props.to}>{props.text}</Link>
)

export default () => (
  <header className={styles.container}>
  	<HeaderLink to='/' text='HOME' />
  	<HeaderLink to='/about' text='ABOUT' />
  </header>
)
