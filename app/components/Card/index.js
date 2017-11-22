import React from 'react';
import Button from '../Button';

export default class Card extends React.Component {
  render() {
    const buttons = this.props.buttons.map((button) => {
      return (
        <Button className="action" key={button.label}>
          <a href={button.link} target="_blank">{button.label || 'Book a room'}</a>
        </Button>
      )
    })
    return (
      <div className={this.props.className}>
        <div className="img">
          <div className="text">
            <h3>{this.props.name}</h3>
            {this.props.location && <h4>{this.props.location}</h4>}
          </div>
        </div>
        <div className='body'>
          <p>
            {this.props.textBody}
          </p>
          <div className="deets">
            <p>{this.props.priceRange} per night</p>
          </div>
          <div className="button-container">
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}
