import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
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
        // 'accomodations',
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
          className={`${this.state.active === page ? 'active' : ''} ${this.state.active === 'where-when' ? 'black' : ''}`}
        >
          <FormattedMessage {...messages[page]} />
        </HeaderLink>
      );
    });

    return (
      <div>
        <header className={this.state.status}>
          <HeaderLink className={`logo ${this.state.active === 'where-when' ? 'black' : ''}`} to="/" onClick={() => this.setState({ active: 'home' })}>olivia + jay</HeaderLink>
          <span>
            {links}
          </span>
        </header>
      </div>
    );
  }
}
