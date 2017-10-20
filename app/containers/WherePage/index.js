import React from 'react';
import Helmet from 'react-helmet';
import ImgContainer from './ImgContainer';
import Map from '../../components/Map'

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
          title="Where"
          meta={[
            { name: 'description', content: 'Jay and Olivia' },
          ]}
        />
        <ImgContainer>
          <div className='content-wrapper'>
            <Map />
          </div>
        </ImgContainer>
      </article>
    );
  }
}
