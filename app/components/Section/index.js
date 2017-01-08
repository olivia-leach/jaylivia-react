import React, { PropTypes } from 'react';

function Section(props) {
  return (
    <section className={props.className}>
      {React.Children.toArray(this.props.children)}
    </section>
  );
}

Section.propTypes = {
  className: PropTypes.string,
};

export default Section;
