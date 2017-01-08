import React from 'react';
import { FormattedMessage } from 'react-intl';

import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      liked: false,
    };
  }

  render() {
    return (
      <div>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/about">
            <FormattedMessage {...messages.about} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}
