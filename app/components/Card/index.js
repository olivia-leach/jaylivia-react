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

    const buttonContainer = (
      <div className="button-container">
        {buttons}
      </div>
    )

    return (
      <div className={this.props.className}>
        <div className="img">
          <div className="text">
            <h3>{this.props.name}</h3>
            {this.props.location && <h4>{this.props.location}</h4>}
          </div>
        </div>
        {this.props.bigCard && buttonContainer}
        <div className='body'>
          <p>
            {this.props.textBody}
          </p>
          <div className="deets">
            {this.props.priceRange && <p>{this.props.priceRange} per night</p>}
          </div>
          {this.props.extraDeets}
          {!this.props.bigCard && buttonContainer}
        </div>
      </div>
    );
  }
}