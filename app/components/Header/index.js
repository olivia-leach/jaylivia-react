import React from 'react';
import { FormattedMessage } from 'react-intl';

import HeaderLink from './HeaderLink';
import messages from './messages';
import LogoInverse from './logo_simp.png';

const Scroll = require('react-scroll');

const Link = Scroll.Link;
const scroll = Scroll.animateScroll;

export default class Header extends React.Component {
  constructor(props) {
    super();

    this.state = {
      pages: [
        // 'home',
        // 'where',
        { id: 'timeline', route: '' },
        { id: 'accommodations', route: '' },
        { id: 'thingstodo', route: 'thingstodo' },
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === 'thingstodo') {
      this.setState({ active: nextProps.location.pathname })
    } else if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({ scrollTo: this.state.active })
    }
  }

  componentDidUpdate() {
    const el = document.getElementById(this.state.active)
    if (el && this.state.scrollTo) {
      scroll.scrollTo(document.getElementById(this.state.active).offsetTop - 100, { duration: 0 });
      this.setState({ scrollTo: null })
    }
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
    const darkLinks = this.state.active === 'thingstodo'

    const links = this.state.pages.map((page) => {
      const correctRoute = `/${page.route}` === this.props.location.pathname
      return (
        <HeaderLink key={page.id} to={correctRoute ? null : page.route} onClick={() => this.setState({ active: page.id, menuOpen: false })}>
          {correctRoute ?
            <Link
              to={page.id}
              spy
              smooth
              offset={-100}
              duration={500}
              // href={`${page.route}#${page.id}`}
              onClick={() => this.setState({ active: page.id, menuOpen: false })}
              className={`${darkLinks ? 'black' : ''}`}
              isDynamic
            >
              <FormattedMessage {...messages[page.id]} />
            </Link> :
              <a className={`${darkLinks ? 'black' : ''}${this.state.active === page.id ? ' active' : ''}`}>
                <span><FormattedMessage {...messages[page.id]} /></span>
              </a>}
        </HeaderLink>
      );
    });

    return (
      <div>
        <header className={this.state.status}>
          <HeaderLink className={`logo ${darkLinks ? 'black' : ''}`} to="/" onClick={() => this.setState({ active: 'home' })}>olivia + jay</HeaderLink>
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
