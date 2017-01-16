import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import Logo from './logo.png';
import LogoClear from './logo_clear.png';
import LogoPlain from './logo_darkwhite.png';
import LogoTeal from './logo_teal.png';
import LogoInverse from './logo_simp.png';

export default class Header extends React.Component {
  constructor(props) {
    super();

    this.state = {
      pages: [
        'home',
        // 'about',
        'where-when',
        // 'when',
        // 'travel',
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
    if (document.body.scrollTop > 50) {
      this.setState({
        status: 'fixed',
      });
    } else {
      this.setState({
        status: 'initial',
      });
    }
  }

  render() {
    const links = this.state.pages.map((page) => {
      return (
        <HeaderLink
          key={page}
          to={page === 'home' ? '/' : `/${page}`}
          onClick={() => this.setState({ active: page })}
          className={this.state.active === page ? 'active' : ''}
        >
          <FormattedMessage {...messages[page]} />
        </HeaderLink>
      );
    });

    return (
      <div>
        <NavBar className={this.state.status}>
          <HeaderLink className="logo" to="/" onClick={() => this.setState({ active: 'home' })}>olivia + jay</HeaderLink>
          <span>
            {links}
          </span>
        </NavBar>
      </div>
    );
  }
}
