import React from 'react';
import PropTypes from 'prop-types'

export default class Sticky extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sticky: false,
    };

    this.scrollEvent = this.scrollEvent.bind(this)
    this.resizeEvent = this.resizeEvent.bind(this)
    this.calcStickiness = this.calcStickiness.bind(this)
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollEvent);
    window.addEventListener('resize', this.resizeEvent)
    this.calcStickiness();
  }

  componentWillReceiveProps() {
    this.calcStickiness();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollEvent);
    window.removeEventListener('resize', this.resizeEvent)
  }

  calcStickiness(callback) {
    // to account for any fixed message banners at the top of the page
    let threshold = parseInt(document.body.getAttribute('data-margin-top'), 10) || 0
    if (this.props.theresholdOffset) { threshold += this.props.theresholdOffset }
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    const setInitialHeights = (elements) => {
      [].forEach.call(elements, (sticky) => {
        const height = sticky.getBoundingClientRect().height;
        const bottom = sticky.getBoundingClientRect().bottom;
        const top = sticky.getBoundingClientRect().top;
        let stickyInitial = (this.props.top ? top : bottom) + scrollTop - threshold
        if (this.props.top && top <= threshold) { stickyInitial -= threshold }
        if (sticky.getBoundingClientRect().top !== threshold) {
          sticky.setAttribute('data-sticky-initial', stickyInitial);
        }
        if (this.props.setBlockHeight) { this.props.setBlockHeight(height); }
      });
    };

    const stickies = [document.getElementById(this.props.id)];
    this.setState({
      stickies,
    }, () => {
      if (callback) { callback() }
    })
    setInitialHeights(stickies);
  }

  resizeEvent() {
    this.setState({
      sticky: false
    }, () => {
      this.calcStickiness(this.scrollEvent)
    })
  }

  scrollEvent() {
    const stickies = this.state.stickies;
    const top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const bottom = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

    [].forEach.call(stickies, (sticky) => {
      const stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial'), 10);
      const stickyEnter = parseInt(sticky.getAttribute('data-sticky-enter'), 10) || Math.abs(stickyInitial);
      const stickyExit = parseInt(sticky.getAttribute('data-sticky-exit'), 10) || bottom;

      // accounts for any fixed message banners at top of page
      let bodyMargin = document.body.getAttribute('data-margin-top') || 0
      if (bodyMargin) { bodyMargin = parseInt(bodyMargin, 10) }
      if (this.props.theresholdOffset) { bodyMargin += this.props.theresholdOffset }

      // if element is full height, calc adjusted height based on margin, footer & fixed message banners
      // const footerHeight = document.getElementById('footer').getBoundingClientRect().height;
      const footerHeight = 0
      const margin = this.props.margin || 0
      const fixedHeight = `calc(100vh - ${footerHeight}px - ${margin}px - ${bodyMargin}px)`

      let styleFix = ''
      if (this.props.fullHeight) {
        styleFix += `height: ${fixedHeight}`
        if (this.props.childElements) {
          this.props.childElements.map(el => {
            document.getElementById(el).setAttribute('style', `height: ${fixedHeight}`)
          })
        }
      }

      if (top >= stickyEnter && top <= stickyExit) {
        this.setState({ sticky: true });
        styleFix += `; margin-top: ${bodyMargin}px;`
        sticky.setAttribute('style', styleFix)
        if (this.props.onStick) { this.props.onStick(true) }
      } else {
        this.setState({ sticky: false });
        styleFix += '; margin-top: 0px'
        sticky.setAttribute('style', styleFix)
        if (this.props.onStick) { this.props.onStick(false) }
      }
    });
  }

  render() {
    const { className, enter, exit, children } = this.props;
    return (
      <div
        className={`Sticky ${className} ${this.state.sticky ? 'sticky' : ''}`}
        data-sticky
        data-sticky-enter={enter}
        data-sticky-exit={exit}
        id={this.props.id}
      >
        {children}
      </div>
    );
  }
}

Sticky.propTypes = {
  className: PropTypes.string,
  enter: PropTypes.string,
  exit: PropTypes.string,
  children: PropTypes.node,
};
