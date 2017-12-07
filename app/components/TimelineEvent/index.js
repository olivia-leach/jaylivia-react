import React from 'react';

export default class TimelineEvent extends React.Component {
  render() {
    return (
      <div className={`timeline-event ${this.props.left ? 'left' : 'right'}`}>
        <p>{this.props.date}</p>
        <h3>{this.props.title}</h3>
        <div className='body'>
          {this.props.image && <img src={this.props.image} />}
          <div>
            <p>{this.props.desc}</p>
            {this.props.desc2 && <p>{this.props.desc2}</p>}
          </div>
        </div>
      </div>
    );
  }
}