import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {injectIntl} from 'react-intl';
import compose from 'ramda/src/compose';
import Icon from '../Icon';

const styles = (vars) => ({
  tagBox: {
    width: 'auto',
    padding: '0px 15px',
    paddingBottom: '2px',
    height: '32px',
    borderRadius: '20px',
    fontSize: '16px',
    border: '1px solid #bcbdc0',
    color: '#bcbdc0',
    cursor: "pointer",
    backgroundColor: 'rgba(188, 189, 192, 0.1)',
    ...vars.mixins.flexCenter()
  },
  /* Reference https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_checkbox */
  disabled: {
    cursor: 'not-allowed'
  },
  checked: {
    backgroundColor: vars.colors.white,
    border: `2px solid ${vars.colors.tertiary.standard}`,
    color: vars.colors.tertiary.standard,
    fontWeight: "bold"
  },
  icon: {
    background: 'transparent',
    marginTop: '4px',
    width: '17px',
    height: '17px',
    marginRight: '5px',
    color: vars.colors.neutral.dark,
    '&.checked': {
      color: vars.colors.tertiary.standard
    }
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  onCheckFn: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
  label: PropTypes.any,
  className: PropTypes.string,
  editing: PropTypes.bool
};


export const StatelessTag = (props) => {
  const {classes, className = '', label, editing, isChecked, onCheckFn} = props;

  const onCheck = () => {
    if (editing) {
      onCheckFn(!isChecked);
    }
  };

  return (
    <div
      className={`${classes.tagBox} ${!editing && classes.disabled} ${isChecked && classes.checked} ${className}`}
      onClick={onCheck}
      data-sn="tag"
    >
      {editing && <Icon
        fontProps={{icon: isChecked ? "times" : "plus"}}
        className={`${classes.icon} ${isChecked && 'checked'}`}
      />}
      {label}
    </div>
  );
};

StatelessTag.propTypes = propTypes;

export default compose(
  injectIntl,
  injectSheet(styles),
)(StatelessTag);




