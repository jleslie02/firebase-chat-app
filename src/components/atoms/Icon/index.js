import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import compose from "ramda/src/compose";
import {injectIntl} from 'react-intl';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faGlobeAmericas,
  faCloud,
  faSpinner,
  faBars,
  faImage,
  faTimes,
  faPlus,
  faAngleDown,
  faTimesCircle,
  faAngleUp,
  faCheck,
  faInfo,
  faPen,
  faPaperPlane,
  faPaperclip
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

library.add(
  faGlobeAmericas,
  faCloud,
  faImage,
  faSpinner,
  faAngleDown,
  faTimesCircle,
  faAngleUp,
  faBars,
  faPlus,
  faPen,
  faCheck,
  faTimes,
  faInfo,
  faPaperPlane,
  faPaperclip
);

const styles = (vars) => ({
  iconWrapper: {
    width: '38px',
    height: '38px',
    'border-radius': '22px',
    'background-color': vars.colors.white,
    ...vars.mixins.flexCenter(),
    '&.disabled': {
      'border-color': vars.colors.muted,
      color: vars.colors.muted
    },
    cursor: 'pointer'
  },
  imageIconWrapper: {
    ...vars.mixins.flexCenter(),
    cursor: "pointer"
  },
  icon: {
    fontSize: '24px'
  }
});

const propTypes = {
  classes: PropTypes.object,
  onClickFn: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fontProps: PropTypes.object,
  imgSrc: PropTypes.string
};

class Icon extends React.Component {
  static propTypes = propTypes;
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {disabled, onClickFn} = this.props;
    if (!disabled && onClickFn) {
      onClickFn();
    }
  }

  render() {
    const {classes, fontProps = {}, className = '', disabled, imgSrc} = this.props;
    let iconView;

    if (imgSrc) {
      iconView = <img alt="icon-img" src={imgSrc} />;
    } else {
      iconView = <FontAwesomeIcon {...fontProps} />;
    }

    return (
      <div
        data-sn="icon"
        onClick={this.onClick}
        className={`${imgSrc ? classes.imageIconWrapper : classes.iconWrapper} ${className} ${disabled ? 'disabled' : ''}`}
      >
        {iconView}
      </div>
    );
  }
}

const ftheme = injectSheet(styles);
export default compose(injectIntl, ftheme)(Icon);
