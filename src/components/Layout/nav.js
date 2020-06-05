import React, { Component } from "react"
import { Link } from "gatsby"

import styles from "./nav.module.scss"

class NavMenu extends Component {
  render() {
    return (
      <nav id={styles.navMenu} className="flex-column">
        <div>
          <Link to="/" activeClassName="active">
            About
          </Link>
        </div>
        <div>
          <Link
            to="/projects/1"
            activeClassName="active"
            partiallyActive={true}
          >
            Projects
          </Link>
        </div>
        <div>
          <Link to="/contact" activeClassName="active" partiallyActive={true}>
            Contact
          </Link>
        </div>
      </nav>
    )
  }
}

export default NavMenu
