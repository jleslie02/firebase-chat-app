import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router';
import compose from 'ramda/src/compose';
import classNames from 'classnames';
import {routes} from '../../../../utils/routings';
require('./animations.css')

const styles = (vars) => ({
  lineContainer: {
    width: '100%',
    marginTop: '150px',
    position: 'relative'
  },
  banner: {
    height: '350px',
    width: '100%',
    marginTop: '30px',
    background: `url(${routes.images.paralax})`,
    backgroundPosition: '0px 0px',
    backgroundRepeat: 'repeat-x',
    animation: 'animatedBackground 17s forwards 1',
    ...vars.mixins.flexCenter(),
    ...vars.mixins.flexDirection("column"),
    position: 'relative'
  },
  typeWrapper: {
    width: '100%',
    height: '100%',
    zIndex: '2',
    background: 'rgba(0,0,0,0.4)',
    ...vars.mixins.flexCenter(),
    ...vars.mixins.flexDirection("column"),
    animation: 'shutdown 3s linear 1',
    animationDelay: '5s'
  },
  typeWriting: {
    color: 'white',
    fontFamily: 'anurati',
    fontSize: '85px', // 45px
    position: 'relative',
    zIndex: '2',
    borderRight: '2px solid rgba(255,255,255,.75)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '470px', //165px

    animation: 'typewriter 4s steps(40) 1s 1 normal both, blinkTextCursor 500ms steps(44) infinite normal'
  },

  slantedOverlay: {
    width: '0',
    ...vars.mixins.transition('width 1s ease-in-out'),
    '&.show': {
      position: 'absolute',
      top: '0',
      zIndex: '10',
      height: '100%',
      width: 'calc(100% - 300px)', // work with the window size here
      maxWidth: '850px',
      right: '-15%',
      background: 'rgba(0,0,0,0.6)',
      transform: 'skew(210.25deg)',
    }
  },
  overlay: {
    position: 'absolute',
    top: '0',
    zIndex: '1',
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.6)'
  },
  overlayFinal: {
    position: 'absolute',
    top: '0',
    zIndex: '14',
    height: '100%',
    width: '100%',
    background: 'rgb(0,0,0)',
    ...vars.mixins.transition('opacity 2s ease-in'),
    opacity: '0',
    '&.enter': {
      opacity: '1'
    }
  },
  doubleJeu: {
    width: '100%',
    height: '100%',
    zIndex: '11',
    color: 'white',
    fontSize: '80px',
    overflow: 'hidden',
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.justifyContent("space-between"),
    height: '0',
    opacity: '1',
    padding: '0 30px',
    '&.enter': {
      height: 'auto'
    }
  },
  double: {
    display: 'inherit',
    ...vars.mixins.flexDirection("column"),
    ...vars.mixins.alignItems("flex-end"),
    flex: '1',
    marginTop: '-15px',
    opacity: '0',
    fontFamily: 'anurati',
    ...vars.mixins.transition('margin-top 2s ease-in-out, opacity 2s ease-in-out'),
    '& > div': {
      marginRight: '0',
      ...vars.mixins.transition('margin-right 2s ease-in-out 3s'),
      fontFamily: 'anurati'
    },
    '&.enter': {
      opacity: '1',
      marginTop: '30px',
      '& > div': {
        marginRight: '-450px'
      }
    }
  },
  line: {
    width: '190px',
    ...vars.mixins.flexCenter(),
    '& > div': {
      width: '0px',
      border: 'none',
      ...vars.mixins.transition('width 2s ease-in-out'),
      '&.enter': {
        width: '190px',
        border: '1px solid',
        marginTop: '30px'
      }
    }
  },
  jeu: {
    flex: '1',
    marginTop: '260px',
    ...vars.mixins.transition('width 1s ease-in-out'),
    opacity: '0',
    '& > div': {
      marginLeft: '0',
      ...vars.mixins.transition('margin-left 2s ease-in-out 3s'),
      fontFamily: 'anurati'
    },
    ...vars.mixins.transition('margin-top 2s ease-in-out, opacity 2s ease-in-out'),
    '&.enter': {
      opacity: '1',
      marginTop: '200px',
      '& > div': {
        marginLeft: '-300px'
      }
    }
  }
});

class Home extends Component {

  constructor() {
    super();

    this.state = {
      timeouts: [],
      hasGlitch: false,
      hasTypewriter: true,
      doubleJeuEntered: false,
      lineEntered: false
    };
    
    this.addGlitch = this.addGlitch.bind(this);
    this.removeTypewriter = this.removeTypewriter.bind(this);
    this.addDoubleJeu = this.addDoubleJeu.bind(this);
    this.addLine = this.addLine.bind(this);
    this.resetAnimation = this.resetAnimation.bind(this);
    this.clearAllTimeouts = this.clearAllTimeouts.bind(this);
    this.finalOverlay = this.finalOverlay.bind(this)
  }

  componentDidMount() {
    setTimeout(this.addGlitch, 3000)
  }

  componentWillUnmount() {
    this.clearAllTimeouts()
  }

  clearAllTimeouts() {
    const timeouts = this.state.timeouts;
    for (let i=0; i<timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
  }

  addGlitch() {
    this.setState({hasGlitch: true});
    this.setState({timeouts: this.state.timeouts.concat([setTimeout(this.removeTypewriter, 4000)])})
  }

  removeTypewriter() {
    this.setState({hasTypewriter: false, hasGlitch: false});
    this.setState({timeouts: this.state.timeouts.concat([setTimeout(this.addDoubleJeu, 1000)])});
  }

  addDoubleJeu() {
    this.setState({doubleJeuEntered: true});
    this.setState({timeouts: this.state.timeouts.concat([setTimeout(this.addLine, 1000)])});
  }

  addLine() {
    this.setState({lineEntered: true});
    this.setState({timeouts: this.state.timeouts.concat([setTimeout(this.finalOverlay, 10000)])});
  }

  finalOverlay() {
    this.setState({closeOverlay: true});
    this.setState({timeouts: this.state.timeouts.concat([setTimeout(this.resetAnimation, 3000)])});
  }

  resetAnimation() {
    this.clearAllTimeouts();

    this.setState({
      timeouts: [],
      hasGlitch: false,
      hasTypewriter: true,
      doubleJeuEntered: false,
      lineEntered: false,
      closeOverlay: false
    })

    this.setState({timeouts: this.state.timeouts.concat([setTimeout(this.addGlitch, 3000)])})
  }

  render() {
    const {classes} = this.props;
    const {hasTypewriter, hasGlitch, doubleJeuEntered, lineEntered, closeOverlay} = this.state;

    return (
      <div className={classes.banner} >
        <div className={classes.overlay} />
        {hasTypewriter && <div className={classes.typeWrapper}>
          <p className={classNames(classes.typeWriting, hasGlitch ? 'glitch' : '')}>
            J E E X . I O
          </p>
        </div>}
        <div className={classNames(classes.slantedOverlay, hasTypewriter ? 'hidden' : 'show')} />
        <div className={classNames(classes.doubleJeu, doubleJeuEntered ? 'enter' : '')}>
          <div className={classNames(classes.double, doubleJeuEntered ? 'enter' : '')}><div>DOUBLE</div></div>
          <div className={classes.line}>
            <div className={lineEntered ? 'enter' : ''}></div>
          </div>
          <div className={classNames(classes.jeu, doubleJeuEntered ? 'enter' : '')}><div>JEU</div></div>
        </div>
        <div className={classNames(classes.overlayFinal, closeOverlay ? 'enter' : '')} />
      </div>
    );
  }
}

const ftheme = injectSheet(styles);
export default compose(withRouter, ftheme)(Home);
