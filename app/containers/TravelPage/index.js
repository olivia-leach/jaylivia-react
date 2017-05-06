import React from 'react';
import Helmet from 'react-helmet';

export default class TravelPage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet
          title="Travel"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
      </article>
    );
  }
}
