import React from "react"
import { Image } from "react-bootstrap"

import styles from "./footer.module.scss"

export default () => (
  <footer id={styles.footer}>
    <span>Built with</span>
    <a
      href="https://www.gatsbyjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/gatsby-logo.png" id={styles.gatsbyLogo} />
    </a>
  </footer>
)
