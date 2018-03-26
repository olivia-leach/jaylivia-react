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
    super(props);
    this.state = {
      pages: [
        // 'home',
        // 'where',
        { id: 'timeline', route: '' },
        { id: 'accommodations', route: '' },
        { id: 'travel', route: '' },
        { id: 'thingstodo', route: 'thingstodo' },
        { id: 'registry', href: 'https://www.zola.com/registry/oliviajay' },
        { id: 'rsvp', route: 'rsvp' },
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
      let scrolloffset = window.innerWidth <= 952 ? 80 : 100
      if (screen.width <= 400) { scrolloffset = -300 }
      scroll.scrollTo(document.getElementById(this.state.active).offsetTop - scrolloffset, { duration: 0 });
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
    const darkLinks = this.state.active === 'rsvp' || this.state.active === 'notfound' || this.state.active === 'guests'

    const scrolloffset = window.innerWidth <= 952 ? -80 : -100

    const links = this.state.pages.map((page) => {
      const correctRoute = `/${page.route}` === this.props.location.pathname && page.id !== 'rsvp'
      return (
        <HeaderLink
          key={page.id}
          href={page.href}
          target={page.href ? '_blank' : ''}
          to={correctRoute || page.herf ? null : page.route}
          onClick={() => this.setState({ active: page.href ? this.state.active : page.id, menuOpen: false })}
        >
          {correctRoute ?
            <Link
              to={page.id}
              spy
              smooth
              offset={scrolloffset}
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
            className={`hamburger hamburger--squeeze ${this.state.menuOpen ? 'is-active' : ''} ${darkLinks ? 'black' : ''}`}
            onClick={this.toggleMenu.bind(this)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </div>
          <span className={`header-links ${this.state.menuOpen ? 'open' : ''}`} id="nav">
            {links}
            {/*}<HeaderLink to='https://www.zola.com/registry/oliviajay' target='_blank'><a><span>REGISTRY</span></a></HeaderLink>*/}
          </span>
        </header>
      </div>
    );
  }
}
