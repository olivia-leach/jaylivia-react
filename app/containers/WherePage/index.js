import React from 'react';
import Helmet from 'react-helmet';
import ImgContainer from './ImgContainer';
import Jumbotron from './Jumbotron';

export default class WherePage extends React.PureComponent {
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
          title="Where+When"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <ImgContainer>
          <Jumbotron>June 23, 2018</Jumbotron>
        </ImgContainer>
      </article>
    );
  }
}
