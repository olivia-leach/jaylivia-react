import React from 'react';
import Helmet from 'react-helmet';
import Button from 'components/Button';

export default class TravelPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      videoLoading: false,
      videoLoaded: false,
      donePlaying: false,
    };
  }

  render() {
    return (
      <article>
        <Helmet
          title="Travel"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <h2>Travel</h2>
      </article>
    );
  }
}
