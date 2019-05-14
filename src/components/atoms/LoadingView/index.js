import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import Transition from 'react-motion-ui-pack';

require("./loading.css");

const styles =
  (vars) => ({
    loading: {
      width: '100%',
      height: '100%',
      ...vars.mixins.flexCenter(),
      'font-size': '100px',
      background: 'rgba(0, 0, 0, 0.9)',
      position: 'absolute',
      left: '0',
      top: '0'
    },
    lineContainer: {
      width: '100%',
      position: 'relative'
    },
    strytLines: {
      ...vars.mixins.flexDisplay(),
      ...vars.mixins.justifyContent('space-between'),
      marginBottom: '13px',
      height: '15px',
      width: '41px',
      margin: '0 auto',
      position: 'relative',
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate'
    },
    strytLinesBottom: {
      height: '50px',
      marginBottom: '30px',
      marginTop: '13px',
      animationName: 'changeBottomHeight'
    },
  
    strytLinesTop: {
      animationName: 'changeTopHeight'
    },
    sLine: {
      ...vars.mixins.flexDisplay(),
      ...vars.mixins.flexDirection('column'),
      ...vars.mixins.alignItems("center"),
      background: 'transparent',
      marginLeft: '4px'
    },
    rightLine: {
      marginLeft: '0px',
      marginRight: '4px'
    },
    toptops: {
      width: '7px',
      backgroundColor: '#FFFFFF',
      paddingTop: '1px'
    },
    topBottoms: {
      height: '50px',
      width: '1px',
      backgroundColor: '#FFFFFF'
    },
    wrap: {
      width: '38px',
      margin: '0 auto',
      position: 'relative'
    },
    line: {
      backgroundColor: '#FFFFFF',
      height: '1px'
    },
    leftRotate: {
      ...vars.mixins.transform('rotate(45deg)')
    },
    rightRotate: {
      ...vars.mixins.transform('rotate(-45deg)'),
      marginTop: '-2px'
    }
  });

const propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export const StatelessLoadingView = (props) => {
  const {classes, className = ''} = props;
  return (
    <Transition key="loading-key" styles={{}} enter={{opacity: 1}} leave={{opacity: 0}} component={false}>
      <div key="loading-view" className={`${classes.loading} ${className}`} data-sn="loading-view">
        <div className={classes.lineContainer}>
          <div className={classNames(classes.strytLines, classes.strytLinesTop)}>
            <div className={classNames(classes.sLine, classes.leftLine)}>
              <div className={classNames(classes.toptops)}></div>
              <div className={classNames(classes.topBottoms)}></div>
            </div>
            <div className={classNames(classes.sLine, classes.rightLine)}>
              <div className={classNames(classes.toptops)}></div>
              <div className={classNames(classes.topBottoms)}></div>
            </div>
          </div>

          <div className={classes.wrap}>
            <div className={classNames(classes.line, classes.leftRotate)}></div>
            <div className={classNames(classes.line, classes.rightRotate)}></div>
          </div>
          <div className={classNames(classes.strytLines, classes.strytLinesBottom)}>
            <div className={classNames(classes.sLine, classes.leftLine)}>
              <div className={classNames(classes.topBottoms)}></div>
              <div className={classNames(classes.toptops)}></div>
            </div>
            <div className={classNames(classes.sLine, classes.rightLine)}>
              <div className={classNames(classes.topBottoms)}></div>
              <div className={classNames(classes.toptops)}></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

StatelessLoadingView.propTypes = propTypes;

export default injectSheet(styles)(StatelessLoadingView);
