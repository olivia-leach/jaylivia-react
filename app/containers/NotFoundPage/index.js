/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Bears from './bears.jpg';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className='page-not-found'>
        <div className='page-container'>
          <div className='white-box'>
            <h2>Bad news!</h2>
            <p>We can't find the page you're looking for.</p>
            <img src={Bears} />
          </div>
        </div>
      </div>
    );
  }
}
