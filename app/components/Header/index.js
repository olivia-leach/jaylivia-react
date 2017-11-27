import React from 'react';
import { FormattedMessage } from 'react-intl';

import HeaderLink from './HeaderLink';
import messages from './messages';
import LogoInverse from './logo_simp.png';

const Scroll = require('react-scroll');

const Link = Scroll.Link;

export default class Header extends React.Component {
  constructor(props) {
    super();

    this.state = {
      pages: [
        'home',
        // 'where',
        'accommodations',
        // 'rsvp',
      ],
      active: props.routes[1].name,
      status: 'initial',
      logo: LogoInverse,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (scrollTop > 20) {
      this.setState({
        status: 'fixed',
      });
    } else {
      this.setState({
        status: 'initial',
      });
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    const links = this.state.pages.map((page) => {
      return (
        <HeaderLink key={page}>
          <Link
            to={page}
            spy
            smooth
            offset={-50}
            duration={500}
            href={page}
            onClick={() => this.setState({ active: page, menuOpen: false })}
            // className={`${page === 'home' ? 'active' : ''}`}
            isDynamic
          >
            <FormattedMessage {...messages[page]} />
          </Link>
        </HeaderLink>
      );
    });

    return (
      <div>
        <header className={this.state.status}>
          <HeaderLink className="logo" to="/" onClick={() => this.setState({ active: 'home' })}>olivia + jay</HeaderLink>
          <div
            className={`hamburger hamburger--elastic ${this.state.menuOpen ? 'is-active' : ''}`}
            onClick={this.toggleMenu.bind(this)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </div>
          <span className={`header-links ${this.state.menuOpen ? 'open' : ''}`} id="nav">
            {links}
          </span>
        </header>
      </div>
    );
  }
}
