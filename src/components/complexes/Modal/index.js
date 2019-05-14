import React from 'react';
import injectSheet from 'react-jss';
import compose from 'ramda/src/compose';
import {injectIntl} from 'react-intl';
import FadeIn from '../../../components/atoms/FadeIn';

const styles = (vars) => ({
  modal: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    'z-index': '1000',
    'background-color': 'rgba(0,0,0, 0.7)',
    ...vars.mixins.flexCenter(),
    ...vars.mixins.alignContent('center'),
    transition: 'background 0.3s ease-out'
  },
  content: {
    ...vars.mixins.flexDisplay(),
    ...vars.mixins.flexDirection('column'),
    borderRadius: `9px`,
    padding: '20px',
    backgroundColor: `#192d3a`,
    background: `linear-gradient(#1f394b,#0d1417)`,
    border: '1px solid #213744',
    borderColor: '#7e744e #b6a671 #55513a #b6a671',
    ...vars.mixins.boxShadow(`inset 0 0 3px 1px rgba(0,0,0,.3), -1px 1px 10px 0 rgba(0,0,0,.8)`)
  }
});

export const StatelessModal = (props) => {
  const {classes = {}, contentClass = '', additionalClasses = {}, fadeOut} = props;
  const {modal = ''} = additionalClasses;

  return (
    <FadeIn fadeOut={fadeOut}>
      <div className={`${classes.modal} ${modal}`} data-sn="modal">
        <div className={[classes.content, contentClass].join(" ")}>
          {props.children}
        </div>
      </div>
    </FadeIn>
  );
};

export default compose(injectIntl, injectSheet(styles))(StatelessModal);
