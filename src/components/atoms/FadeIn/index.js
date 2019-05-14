import React, {Component} from 'react';
import injectSheet from 'react-jss';
import compose from 'ramda/src/compose';

const styles = () => ({
  FadeIn: {
    opacity: '0',
    transition: 'opacity .2s linear',
    position: 'absolute',
  },
  second: {
    opacity: '1',
  }
});

export class StatefulFadeIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount() {
    setTimeout(() => {this.setState({visible: true});}, 0);
  }

  render() {
    const classes = this.props.classes;
    let visible = (this.state.visible && !this.props.fadeOut) ? classes.second : null;

    return (
      <div data-sn="fade-in" className={`${classes.FadeIn} ${visible}`}>
        {this.props.children}
      </div>
    );
  }
}

export default compose(injectSheet(styles))(StatefulFadeIn);
