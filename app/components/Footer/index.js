import React from 'react';

import Logo from '../Header/logo.png';
import LogoInverse from '../Header/logo_simp.png';
import FooterBlock from './FooterBlock';

export default class Footer extends React.Component {
  constructor() {
    super();

    this.state = {
      logo: LogoInverse,
    };
  }

  render() {
    return (
      <FooterBlock>
        <img
          onMouseEnter={() => this.setState({ logo: Logo })}
          onMouseLeave={() => this.setState({ logo: LogoInverse })}
          onClick={() => window.scrollTo(0, 0)}
          className="logo"
          src={this.state.logo}
          role="presentation"
        />
      </FooterBlock>
    );
  }
}
