import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styles from "./header.module.scss"

const HeaderLink = props => (
  <Link className={styles.link} to={props.to}>
    {props.text}
  </Link>
)

export default () => (
  <StaticQuery
    query={graphql`
      query {
        profile {
          id
        }
      }
    `}
    render={data => (
      <header className={styles.container}>
        <HeaderLink to="/" text="HOME" />
        <HeaderLink to="/about" text="ABOUT" />
        <div>{data.profile.id}</div>
      </header>
    )}
  />
)
