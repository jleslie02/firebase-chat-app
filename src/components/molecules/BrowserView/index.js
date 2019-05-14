import React, {Component} from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import compose from 'ramda/src/compose';

const styles = () => ({
  browserView: {
    overflow: 'hidden'
  }
});

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  offset: PropTypes.number,
  name: PropTypes.string
};

export class StatefulBrowserView extends Component {
  static propTypes = propTypes;

  constructor() {
    super();
    this.state = {
      height: 0,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    // https://stackoverflow.com/questions/19014250/reactjs-rerender-on-browser-resize
    const {offset} = this.props;

    let documentElement = document.documentElement;
    let body = document.getElementsByTagName('body')[0];
    let height = window.innerHeight || documentElement.clientHeight || body.clientHeight;
    this.setState({height: height + (offset || 0)});
  }
  render() {
    const {classes, name, className, children} = this.props;
    const {height} = this.state;

    return (
      <div
        className={`${classes.browserView} ${className}`}
        data-sn={name || "browser-view"}
        style={{height: height}}
      >
        {children}
      </div>
    );
  }
}

const ftheme = injectSheet(styles);
export default compose(ftheme)(StatefulBrowserView);
